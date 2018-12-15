import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  Loading
} from 'ionic-angular';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FundamentalModal } from '../fundamental-modal';
import { BookService } from '../../app/services/book.service';
import { BookshelfService } from '../../app/services/bookshelf.service';

@Component({
  selector: 'book-details-modal',
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal extends FundamentalModal {
  loader: Loading;
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

    this.loader = this.loadingCtrl.create({
      content: '読み込み中です…'
    });

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
        this.image = book.image;
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
    try {
      this.loaded = false;
      this.loader.present();
      await this.bookshelfService.registerBook(this.isbn);
      this.loader.dismiss();
      this.loaded = true;
    } catch (e) {
      this.showError(e);
      console.error(e);
    }
  }

  async unregister() {
    try {
      this.loaded = false;
      this.loader.present();
      await this.bookshelfService.unregisterBook(this.isbn);
      this.loader.dismiss();
      this.loaded = true;
    } catch (e) {
      this.showError(e);
      console.error(e);
    }
  }
}
