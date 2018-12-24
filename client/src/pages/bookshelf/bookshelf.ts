import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisteredBook } from '../../app/models/registered-book';
import { State } from '../../app/state/_state.interfaces';
import { WatchBookshelf } from '../../app/state/bookshelf/bookshelf.action';
import { getBooks, getUser } from '../../app/state/_state.selectors';
import { SearchPage } from './search-page/search-page';
import {
  AlertController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { FixAlertController } from '../fix-alert-controller';
import { AngularFireFunctions } from '@angular/fire/functions';
import { pickOnce } from '../../app/state/book/book.effect';

@Component({
  templateUrl: 'bookshelf.html'
})
export class BookshelfPage extends FixAlertController {
  books$: Observable<RegisteredBook[]>;
  additions = [];
  private length = 0;
  pushPage = SearchPage;

  constructor(
    private store: Store<State>,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afFunctions: AngularFireFunctions
  ) {
    super();
  }

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

  searchBookListener() {
    this.alertCtrl
      .create({
        title: 'ISBN で本を検索',
        inputs: [
          {
            name: 'isbn',
            placeholder: 'ISBN (13桁)'
          }
        ],
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel'
          },
          {
            text: '検索',
            handler: data => {
              if (this.conversion) {
                this.conversion = false;
                return false;
              }
              data.isbn = data.isbn.replace(/-/g, '');
              if (data.isbn.length !== 13) {
                this.showError('13桁で入力してください');
                return false;
              }
              this.searchBook(data.isbn);
            }
          }
        ]
      })
      .present();
  }

  async searchBook(isbn: string) {
    const loader = this.loadingCtrl.create({
      content: '検索中です…'
    });
    loader.present();
    try {
      const books = await pickOnce(
        this.afFunctions.httpsCallable('searchBooksByISBN')({
          isbn,
          usingGoogleBooksAPI: true
        })
      );
      if (books.length === 0) {
        this.alertCtrl
          .create({
            title: 'ヒットしませんでした',
            buttons: ['閉じる']
          })
          .present();
      } else {
        const book = books[0];
        this.alertCtrl
          .create({
            title: 'ヒットしました',
            message: book.title,
            buttons: [
              {
                text: 'キャンセル',
                role: 'cancel'
              },
              {
                text: '追加',
                handler: () => {
                  pickOnce(this.store.pipe(select(getUser)))
                    .then(user => {
                      if (user !== void 0 && user !== null) {
                        pickOnce(
                          this.afFunctions.httpsCallable('registerBook')({
                            isbn: book.isbn,
                            uid: user.uid
                          })
                        );
                      } else {
                        throw new Error('アカウント情報の取得に失敗しました');
                      }
                    })
                    .catch(e => {
                      this.showError(e);
                    });
                }
              }
            ]
          })
          .present();
      }
    } catch (e) {
      this.showError(e);
    } finally {
      loader.dismiss();
    }
  }

  private showError(err: any) {
    this.toastCtrl.create({
      message: err,
      duration: 5000,
      position: 'top'
    });
  }
}
