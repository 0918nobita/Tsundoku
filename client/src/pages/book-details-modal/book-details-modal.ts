import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FundamentalModal } from '../fundamental-modal';
import { BookService } from '../../app/services/book.service';
import { BookshelfService } from '../../app/services/bookshelf.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { pickOnce } from '../../app/state/book/book.effect';
import { Plan } from '../../app/models/plan';

@Component({
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal extends FundamentalModal {
  isbn: string;
  title: string;
  desc: string;
  image: string;
  added: boolean;
  loaded: boolean;
  alreadyPlanned: boolean;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private bookService: BookService,
    private bookshelfService: BookshelfService,
    private alertCtrl: AlertController,
    private afFirestore: AngularFirestore
  ) {
    super(viewCtrl, toastCtrl);
    this.added = false;
    this.loaded = false;
    this.alreadyPlanned = false;
    this.isbn = this.navParams.get('isbn');
    this.image = this.navParams.get('image');

    const subscription = timer(500)
      .pipe(take(1))
      .subscribe({
        next() {
          this.loader.present();
        },
        complete() {
          this.loader.dismiss();
        }
      });

    this.bookService
      .getBookByISBN(this.isbn)
      .then(book => {
        if (book === null) {
          this.showError('本の情報の取得に失敗しました');
          return;
        }
        this.title = book.title;
        this.desc = book.desc;
        subscription.unsubscribe();
      })
      .catch(err => {
        subscription.unsubscribe();
        this.showError(err);
      });

    const uid = (firebase.auth().currentUser as firebase.User).uid;
    this.bookService.isOwnedBy(this.isbn, uid).subscribe(result => {
      this.loaded = true;
      this.added = result;
      if (result) {
        pickOnce(
          this.afFirestore
            .collection<Plan>('plans', ref =>
              ref.where('isbn', '==', this.isbn).where('uid', '==', uid)
            )
            .valueChanges()
        ).then(result => {
          this.alreadyPlanned = result.length !== 0;
        });
      }
    });
  }

  async register() {
    const loader = this.loadingCtrl.create({
      content: '追加処理中です…'
    });
    loader.present();
    try {
      this.loaded = false;
      await this.bookshelfService.registerBook(this.isbn);
      this.loaded = true;
    } catch (e) {
      this.showError(e);
      console.error(e);
    } finally {
      loader.dismiss();
    }
  }

  createPlan() {
    this.alertCtrl
      .create({
        title: '読書計画の追加',
        message: '計画のタイトルと説明文を入力してください',
        inputs: [
          {
            name: 'title',
            placeholder: 'タイトル'
          },
          {
            name: 'desc',
            placeholder: '説明文 (任意)'
          }
        ],
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel'
          },
          {
            text: '決定',
            handler: content => {
              if (this.conversion) {
                this.conversion = false;
                return false;
              }
              const timestamp = firebase.firestore.Timestamp.fromDate(
                new Date()
              );
              this.afFirestore.collection('plans').add({
                ...content,
                isbn: this.isbn,
                uid: (firebase.auth().currentUser as firebase.User).uid,
                progress: 0,
                created: timestamp,
                modified: timestamp
              });
              this.dismiss();
            }
          }
        ]
      })
      .present();
  }

  unregisterListener() {
    this.alertCtrl
      .create({
        title: '本当に削除しますか？',
        message: '紐付けられた読書計画・スキルも削除されます',
        buttons: [
          {
            text: '削除する',
            handler: () => {
              this.unregister()
                .then(() => {
                  this.dismiss();
                })
                .catch(e => {
                  this.showError(e);
                  this.dismiss();
                });
            }
          },
          {
            text: 'キャンセル',
            role: 'cancel'
          }
        ]
      })
      .present();
  }

  async unregister() {
    const loader = this.loadingCtrl.create({
      content: '削除処理中です…'
    });
    loader.present();
    try {
      this.loaded = false;
      await this.bookshelfService.unregisterBook(this.isbn);
      this.loaded = true;
    } catch (e) {
      this.showError(e);
      console.error(e);
    } finally {
      loader.dismiss();
    }
  }
}
