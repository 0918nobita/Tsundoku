import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  WatchBookshelf,
  BookshelfActionTypes,
  UpdateBookshelf
} from './bookshelf.action';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { mine } from '../../../app/services/firestore-utils';
import { RegisteredBook } from '../../../app/models/registered-book';
import { BookService } from '../../../app/services/book.service';

@Injectable()
export class BookshelfEffects {
  constructor(
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  @Effect()
  watchBookshelf: Observable<Action> = this.actions$.pipe(
    ofType<WatchBookshelf>(BookshelfActionTypes.WatchBookshelf),
    concatMap(() => {
      const nextRegisteredBooks = async (registeredBooks: RegisteredBook[]) => {
        for (let i = 0; i < registeredBooks.length; i++) {
          registeredBooks[i] = await this.bookService.embedBookDetails(
            registeredBooks[i]
          );
        }
        return registeredBooks;
      };

      return this.afFirestore
        .collection<RegisteredBook>('bookshelf', mine)
        .valueChanges()
        .pipe(
          concatMap(nextRegisteredBooks),
          map(books => new UpdateBookshelf(books))
        );
    })
  );
}
