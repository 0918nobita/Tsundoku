import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { BookService } from '../../app/services/book.service';
import { FundamentalModal } from '../fundamental-modal';

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
    protected viewCtrl: ViewController,
    private bookService: BookService
  ) {
    super(viewCtrl);
    this.isbn = this.navParams.get('isbn');
    this.bookService.getBookByISBN(this.isbn).then(book => {
      this.title = book.title;
      this.desc = book.desc;
      this.image = book.image;
    });
  }
}
