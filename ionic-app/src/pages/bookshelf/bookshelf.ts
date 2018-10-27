import { Component } from '@angular/core';
import {
  ActionSheetController,
  NavController,
  ToastController
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
            handler: () => console.log('ISBN')
          },
          {
            text: '本の情報を手動入力する',
            handler: () => console.log('自分で情報を入力する')
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
