import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  LoadBookDetails,
  BookActionTypes,
  LoadBookDetailsFail,
  LoadBookDetailsSuccess
} from './book.action';
import {
  concatMap,
  map,
  catchError,
  mergeMap,
  skipWhile,
  take
} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action } from '@ngrx/store';
import { AuthEffects } from '../auth/auth.effect';
import { RegisteredBook } from '../../models/registered-book';
import { ResolvedBook } from '../../models/resolved-book';
import { BookService } from '../../services/book.service';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private authEffects: AuthEffects,
    private bookService: BookService
  ) {}

  // 指定された ISBN に対応する本が存在していれば、それを自分が本棚に追加しているどうかを調べる
  @Effect()
  loadBookDetails: Observable<Action> = this.actions$.pipe(
    ofType<LoadBookDetails>(BookActionTypes.LoadBookDetails),
    concatMap(action =>
      this.afFirestore
        .collection<ResolvedBook>('resolvedBooks', ref =>
          ref.where('isbn', '==', action.isbn)
        )
        .valueChanges()
        .pipe(
          skipWhile(books => books.length === 0),
          map(books => books[0]),
          mergeMap(async book => {
            const uid = await pickOnce(this.authEffects.forAuthenticated);
            const isOwnedBy = await pickOnce(
              this.bookService.isOwnedBy(action.isbn, uid)
            );
            if (isOwnedBy === false) {
              return new LoadBookDetailsSuccess(book);
            }
            const registeredBooks = await pickOnce(
              this.afFirestore
                .collection<RegisteredBook>('bookshelf', ref =>
                  ref.where('isbn', '==', action.isbn).where('uid', '==', uid)
                )
                .valueChanges()
            );
            if (registeredBooks.length === 0) {
              throw new Error('予期せぬエラーが発生しました');
            }
            return new LoadBookDetailsSuccess(registeredBooks[0]);
          })
        )
    ),
    catchError(e => of(new LoadBookDetailsFail(e)))
  );
}

function pickOnce<T>(observable: Observable<T>): Promise<T> {
  return observable.pipe(take(1)).toPromise();
}
