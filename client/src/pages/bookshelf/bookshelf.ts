import { Component } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
} from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

import { RegisteredBook } from 'shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';
import { BookDetailsModal } from '../book-details-modal/book-details-modal';
import { BookCreationModal } from './book-creation-modal/book-creation-modal';
import { BookAdditionModal } from './book-addition-modal/book-addition-modal';

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  registeredBooks: RegisteredBook[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private bookshelfService: BookshelfService
  ) {}

  ionViewDidLoad() {
    this.bookshelfService
      .getBookshelf(firebase.auth().currentUser.uid)
      .subscribe(book => {
        if (
          this.registeredBooks.filter(item => item.isbn == book.isbn).length ===
          0
        ) {
          this.registeredBooks.push(book);
          this.sortByModifiedDatetime();
        }
      });
  }

  sortByModifiedDatetime() {
    this.registeredBooks.sort((former, latter) => {
      const formerMillis = former.modified.toMillis(),
        latterMillis = latter.modified.toMillis();

      if (formerMillis < latterMillis) return -1;
      if (formerMillis > latterMillis) return 1;
      return 0;
    });
  }

  async addBook() {
    await this.actionSheetCtrl
      .create({
        title: '本を追加する',
        buttons: [
          {
            text: '本をISBNで検索する',
            handler: () => {
              this.modalCtrl.create(BookAdditionModal).present();
            }
          },
          {
            text: '本の情報を手動入力する',
            handler: () => {
              this.modalCtrl.create(BookCreationModal).present();
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

  showDetails(isbn: string) {
    this.modalCtrl.create(BookDetailsModal, { isbn }).present();
  }
}
