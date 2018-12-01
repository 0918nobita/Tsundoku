import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from 'ionic-angular';
import 'firebase/functions';

import { RegisteredBook } from '../../app/models/registered-book';
import { Store, select } from '@ngrx/store';
import { State } from '../../app/state/_state.interfaces';
import { WatchBookshelf } from '../../app/state/bookshelf/bookshelf.action';
import { Observable } from 'rxjs';
import { getBooks } from '../../app/state/_state.selectors';
import { map } from 'rxjs/operators';
import { sortByDatetime } from '../../app/services/firestore-utils';

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  books$: Observable<RegisteredBook[]>;
  additions = [];
  private length = 0;

  constructor(private store: Store<State>) {}

  ionViewDidLoad() {
    window.addEventListener('resize', () => this.adjustThumbnails());

    this.store.dispatch(new WatchBookshelf());

    this.books$ = this.store.pipe(
      select(getBooks),
      map(books => {
        sortByDatetime({ key: 'modified', objects: books }, 'asc');
        this.length = books.length;
        this.adjustThumbnails();
        return books;
      })
    );
  }

  adjustThumbnails() {
    const firstThumbnail = document.getElementsByClassName('book-thumbnail')[0];
    if (firstThumbnail === void 0) return;

    const booksRow = document.getElementById('books-row'),
      bookWidth = parseInt(
        window.getComputedStyle(firstThumbnail).width as string,
        10
      ),
      columns = Math.floor(
        parseInt(
          window.getComputedStyle(booksRow as HTMLElement).width as string,
          10
        ) /
          (bookWidth + 10)
      );

    if (columns > this.length) {
      this.additions = [];
      return;
    }

    const rest = this.length % columns;
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
}
