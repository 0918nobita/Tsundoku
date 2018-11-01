import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from 'ionic-angular';
import 'firebase/functions';

import { RegisteredBook } from 'shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';
import { BookCreationModal } from './book-creation-modal/book-creation-modal';
import { BookAdditionModal } from './book-addition-modal/book-addition-modal';

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  registeredBooks: RegisteredBook[] = [];
  additions = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private bookshelfService: BookshelfService
  ) {}

  ionViewDidLoad() {
    window.addEventListener('resize', () => this.adjustThumbnails());

    this.bookshelfService.getBookshelf().subscribe(book => {
      if (
        this.registeredBooks.filter(item => item.isbn == book.isbn).length === 0
      ) {
        this.registeredBooks.push(book);
        this.sortByModifiedDatetime();
      }

      this.adjustThumbnails();
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

  adjustThumbnails() {
    const booksRow = document.getElementById('books-row'),
      bookWidth = parseInt(
        window.getComputedStyle(
          document.getElementsByClassName('book-thumbnail')[0]
        ).width
      ),
      columns = Math.floor(
        parseInt(window.getComputedStyle(booksRow).width) / (bookWidth + 10)
      );

    if (columns > this.registeredBooks.length + 1) {
      this.additions = [];
      return;
    }

    const rest = (this.registeredBooks.length + 1) % columns;
    if (rest === 0) return;

    const diff = columns - rest;

    if (diff > this.additions.length) {
      Array.prototype.push.apply(
        this.additions,
        new Array(diff - this.additions.length)
      );
    } else if (diff < this.additions.length) {
      this.additions.splice(0, this.additions.length - diff);
    }
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
            text: '本をスキルで検索する',
            handler: () => {
              this.modalCtrl.create(BookCreationModal).present();
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
}
