import { Component } from '@angular/core';
import { ToastController, ViewController } from 'ionic-angular';
import { BookService } from '../../../app/services/book.service';
import firebase from 'firebase';
import 'firebase/functions';

import { ResolvedBook } from 'shared/entity';

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
      this.showError(error);
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
      this.showError(error);
    }
  }

  showError(error) {
    this.toastCtrl
      .create({
        message: error,
        duration: 5000,
        position: 'top'
      })
      .present();
  }
}
