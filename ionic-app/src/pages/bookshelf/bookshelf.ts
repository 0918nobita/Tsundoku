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
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
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
}

@Component({
  selector: 'book-addition-modal',
  templateUrl: 'book-addition-modal.html'
})
export class BookAdditionModal {
  constructor(private viewCtrl: ViewController) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
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
