import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { RegisteredBook } from '../../../../shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  registeredBooks: RegisteredBook[] = [];

  constructor(
    public navCtrl: NavController,
    private bookshelfService: BookshelfService
  ) {}

  ionViewDidLoad() {
    this.bookshelfService
      .getBookshelf(firebase.auth().currentUser.uid)
      .subscribe(book => {
        if (this.registeredBooks.indexOf(book) === -1)
          this.registeredBooks.push(book);
      });
  }
}
