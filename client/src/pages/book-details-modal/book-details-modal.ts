import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController
} from 'ionic-angular';

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

    loader.present();
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
        loader.dismiss();
      })
      .catch(err => {
        loader.dismiss();
        this.showError(err);
      });
  }
}
