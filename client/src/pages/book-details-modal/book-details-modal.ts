import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FundamentalModal } from '../fundamental-modal';
import { BookService } from '../../app/services/book.service';
import { BookshelfService } from '../../app/services/bookshelf.service';

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

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private bookService: BookService,
    private bookshelfService: BookshelfService
  ) {
    super(viewCtrl, toastCtrl);
    this.added = false;
    this.loaded = false;
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

    this.bookService
      .isOwnedBy(this.isbn, (firebase.auth().currentUser as firebase.User).uid)
      .subscribe(result => {
        this.loaded = true;
        this.added = result;
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
