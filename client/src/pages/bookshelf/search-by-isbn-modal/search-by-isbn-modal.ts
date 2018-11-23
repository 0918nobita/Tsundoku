import { Component } from '@angular/core';
import { ToastController, ViewController } from 'ionic-angular';
import { BookService } from '../../../app/services/book.service';
import * as firebase from 'firebase/app';
import 'firebase/functions';

import { ResolvedBook } from 'shared/entity';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'search-by-isbn-modal',
  templateUrl: 'search-by-isbn-modal.html'
})
export class SearchByIsbnModal extends FundamentalModal {
  isbn: string;
  show: boolean = false;
  hitBook: ResolvedBook;

  constructor(
    protected toastCtrl: ToastController,
    protected viewCtrl: ViewController,
    private bookService: BookService
  ) {
    super(viewCtrl, toastCtrl);
  }

  async search() {
    try {
      this.isbn = this.isbn.replace(/-/g, '');
      if (this.isbn.length !== 13) throw new Error('13桁で入力してください');
      this.show = false;
      this.hitBook = await this.bookService.getBookByISBN(this.isbn);
      this.show = true;
    } catch (error) {
      await this.showError(error);
    }
  }

  async add(isbn: string) {
    try {
      await Promise.all([
        firebase.functions().httpsCallable('registerBook')({
          uid: (firebase.auth().currentUser as firebase.User).uid,
          isbn
        }),
        this.dismiss()
      ]);
    } catch (error) {
      await this.showError(error);
    }
  }
}
