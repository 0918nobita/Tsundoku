import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';

import { FundamentalModal } from '../fundamental-modal';
import { Store, select } from '@ngrx/store';
import { State } from '../../app/state/_state.interfaces';
import { GetBook } from '../../app/state/book/book.action';
import { Observable } from 'rxjs';
import { ResolvedBook } from '../../app/models/resolved-book';
import { getBookDetail } from '../../app/state/_state.selectors';

@Component({
  selector: 'book-details-modal',
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal extends FundamentalModal {
  book$: Observable<ResolvedBook | null>;

  isbn: string;
  title: string;
  desc: string;
  image: string;

  constructor(
    private navParams: NavParams,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private store: Store<State>
  ) {
    super(viewCtrl, toastCtrl);
    this.isbn = this.navParams.get('isbn');
    this.book$ = this.store.pipe(select(getBookDetail));

    this.book$.subscribe(book => {
      if (book === null) return;
      this.title = book.title;
      this.desc = book.desc;
      this.image = book.image;
    });
  }

  ionViewWillEnter() {
    this.title = '';
    this.desc = '';
    this.image = '';
    this.store.dispatch(new GetBook({ isbn: this.isbn }));
  }
}
