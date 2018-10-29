import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-details-modal',
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal {
  isbn: string;
  title: string;
  desc: string;
  image: string;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private bookService: BookService
  ) {
    this.isbn = this.navParams.get('isbn');
    this.bookService.getBookByISBN(this.isbn).then(book => {
      this.title = book.title;
      this.desc = book.desc;
      this.image = book.image;
    });
  }

  async dismiss() {
    await this.viewCtrl.dismiss();
  }
}
