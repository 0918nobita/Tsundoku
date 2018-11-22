import { Component } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  Loading,
  LoadingController
} from 'ionic-angular';

import { FundamentalModal } from '../fundamental-modal';
import { Store, select } from '@ngrx/store';
import { State } from '../../app/state/_state.interfaces';
import { GetBook } from '../../app/state/book/book.action';
import { Observable, from } from 'rxjs';
import { ResolvedBook } from '../../app/models/resolved-book';
import {
  getBookDetail,
  nowLoadingBook
} from '../../app/state/_state.selectors';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'book-details-modal',
  templateUrl: 'book-details-modal.html'
})
export class BookDetailsModal extends FundamentalModal {
  book$: Observable<ResolvedBook | null>;
  loader: Loading;

  isbn: string;
  title: string;
  desc: string;
  image: string;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private store: Store<State>
  ) {
    super(viewCtrl, toastCtrl);
    this.isbn = this.navParams.get('isbn');
    this.book$ = this.store.pipe(select(getBookDetail));

    this.loader = this.loadingCtrl.create({
      content: '読み込み中です…'
    });

    this.store.pipe(
      select(nowLoadingBook),
      concatMap(bool =>
        from(bool ? this.loader.present() : this.loader.dismiss())
      )
    );

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
