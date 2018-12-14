import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

import { FundamentalModal } from '../fundamental-modal';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-details-modal',
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal extends FundamentalModal {
  isbn: string;
  title: string;
  desc: string;
  image: string;
  added = false;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private bookService: BookService
  ) {
    super(viewCtrl, toastCtrl);
    this.isbn = this.navParams.get('isbn');

    const loader = this.loadingCtrl.create({
      content: '読み込み中です…'
    });

    const subscription = timer(500)
      .pipe(take(1))
      .subscribe({
        next() {
          loader.present();
        },
        complete() {
          loader.dismiss();
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
  }
}
