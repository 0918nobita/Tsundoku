import { Component } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  NavController,
  ToastController,
  ViewController
} from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

import { RegisteredBook, ResolvedBook } from '../../../../shared/entity';
import { BookshelfService } from '../../app/services/bookshelf.service';
import { BookService } from '../../app/services/book.service';
import { BookDetailsModal } from '../book-details-modal/book-details-modal';

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  registeredBooks: RegisteredBook[] = [];

  constructor(
    public navCtrl: NavController,
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

@Component({
  selector: 'book-addition-modal',
  templateUrl: 'book-addition-modal.html'
})
export class BookAdditionModal {
  isbn: string;
  show: boolean = false;
  hitBook: ResolvedBook;

  constructor(
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private bookService: BookService
  ) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }

  async search() {
    try {
      this.show = false;
      this.hitBook = await this.bookService.getBookByISBN(this.isbn);
      this.show = true;
    } catch (error) {
      await this.toastCtrl
        .create({
          message: error,
          duration: 5000,
          position: 'top'
        })
        .present();
    }
  }

  async add(isbn: string) {
    try {
      await Promise.all([
        firebase.functions().httpsCallable('registerBook')({
          uid: firebase.auth().currentUser.uid,
          isbn
        }),
        this.dismiss()
      ]);
    } catch (error) {
      await this.toastCtrl
        .create({
          message: error,
          duration: 5000,
          position: 'top'
        })
        .present();
    }
  }
}

@Component({
  selector: 'book-creation-modal',
  templateUrl: 'book-creation-modal.html'
})
export class BookCreationModal {
  constructor(private viewCtrl: ViewController) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }
}
