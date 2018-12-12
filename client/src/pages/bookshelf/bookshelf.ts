import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisteredBook } from '../../app/models/registered-book';
import { State } from '../../app/state/_state.interfaces';
import { WatchBookshelf } from '../../app/state/bookshelf/bookshelf.action';
import { getBooks } from '../../app/state/_state.selectors';
import { Platform } from 'ionic-angular';

enum Fragment {
  Library,
  Search
}

@Component({
  selector: 'page-bookshelf',
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage {
  books$: Observable<RegisteredBook[]>;
  additions = [];
  private length = 0;
  fragment: Fragment = Fragment.Library;
  showSearchCancelButton = true;
  text = '';
  @ViewChild('libraryFragment') libraryFragment;
  @ViewChild('searchFragment') searchFragment;
  mdSearchIcon: HTMLElement;
  mdCancelButton: HTMLElement;
  iosCancelButton: HTMLElement;

  constructor(
    private store: Store<State>,
    private platform: Platform,
    private el: ElementRef
  ) {}

  ionViewDidLoad() {
    window.addEventListener('resize', () => this.adjustThumbnails());

    this.store.dispatch(new WatchBookshelf());

    this.books$ = this.store.pipe(
      select(getBooks),
      map(books => {
        this.length = books.length;
        this.adjustThumbnails();
        return books;
      })
    );

    this.mdSearchIcon = this.el.nativeElement.querySelector(
      '.searchbar-search-icon'
    );
    this.mdCancelButton = this.el.nativeElement.querySelector(
      '.searchbar-md-cancel'
    );
    this.mdCancelButton.addEventListener('click', () => {
      this.onCancelSearch();
      this.mdCancelButton.style.display = 'none';
      this.mdSearchIcon.style.display = 'block';
    });

    this.iosCancelButton = this.el.nativeElement.querySelector(
      '.searchbar-ios-cancel'
    );
    this.iosCancelButton.addEventListener('click', () => {
      this.onCancelSearch();
      this.iosCancelButton.style.display = 'none';
    });
  }

  switchFragment(to = Fragment.Search) {
    this.libraryFragment.nativeElement.style.display =
      to === Fragment.Search ? 'none' : 'block';

    this.searchFragment.nativeElement.style.display =
      to === Fragment.Search ? 'block' : 'none';

    this.fragment = to;
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

  onFocus() {
    const platforms = this.platform.platforms();

    if (platforms.indexOf('ios') !== -1) {
      this.iosCancelButton.style.display = 'block';
    } else {
      this.mdSearchIcon.style.display = 'none';
      this.mdCancelButton.style.display = 'block';
    }

    this.switchFragment();
  }

  updateText() {
    console.log(`Update: ${this.text}`);
  }

  onCancelSearch() {
    (document.activeElement as HTMLElement).blur();
    this.switchFragment(Fragment.Library);
  }
}
