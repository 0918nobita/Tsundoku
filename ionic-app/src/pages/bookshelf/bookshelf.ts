import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisteredBook } from '../../../../shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';

@Component({
  selector: 'page-home',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  registeredBooks: RegisteredBook[] = [];

  constructor(
    public navCtrl: NavController,
    private bookshelfService: BookshelfService
  ) {}

  ionViewDidLoad() {
    this.bookshelfService.getBookshelf('0918nobita').subscribe(book => {
      if (this.registeredBooks.indexOf(book) === -1)
        this.registeredBooks.push(book);
    });
  }
}
