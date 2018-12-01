import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  WatchBookshelf,
  BookshelfActionTypes,
  UpdateBookshelf
} from './bookshelf.action';
import { Observable, from } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
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
      const nextRegisteredBooks = (registeredBooks: RegisteredBook[]) =>
        from(registeredBooks).pipe(
          mergeMap(registeredBook =>
            from(this.bookService.embedBookDetails(registeredBook))
          )
        );

      return this.afFirestore
        .collection<RegisteredBook>('bookshelf', mine)
        .valueChanges()
        .pipe(
          mergeMap(nextRegisteredBooks),
          map(book => new UpdateBookshelf({ book }))
        );
    })
  );
}
