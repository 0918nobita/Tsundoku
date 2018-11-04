import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from 'ionic-angular';
import 'firebase/functions';

import { RegisteredBook } from 'shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';
import { BookCreationModal } from './book-creation-modal/book-creation-modal';
import { SearchByIsbnModal } from './search-by-isbn-modal/search-by-isbn-modal';
import { SearchBySkillModal } from './search-by-skill-modal/search-by-skill-modal';
import {
  sortByDatetime,
  updateDynamicList
} from '../../app/services/firestore.service';

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
      updateDynamicList(this.registeredBooks, book);
      sortByDatetime({ key: 'modified', objects: this.registeredBooks }, 'asc');
      this.adjustThumbnails();
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
              this.modalCtrl.create(SearchByIsbnModal).present();
            }
          },
          {
            text: '本をスキルで検索する',
            handler: () => this.modalCtrl.create(SearchBySkillModal).present()
          },
          {
            text: '本の情報を手動入力する',
            handler: () => this.modalCtrl.create(BookCreationModal).present()
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
