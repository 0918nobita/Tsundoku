import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { GetBook, BookActionTypes } from './book.action';
import { concatMap, take, map } from 'rxjs/operators';
import { Dexie } from 'dexie';
import { LocalDatabase } from '../services/local-database';
import { ResolvedBook } from '../models/resolved-book';

import { GetBookSuccess, GetBookFail } from './book.action';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class BookEffects {
  private resolvedBooks: Dexie.Table<ResolvedBook, number>;

  constructor(
    private actions$: Actions,
    private localDB: LocalDatabase,
    private afFirestore: AngularFirestore
  ) {
    this.resolvedBooks = this.localDB.table('resolvedBooks');
  }

  /*
    本の情報の取得 ( ヒットする前提 )
    1. オフラインだったらローカル DB で検索する → 見つからなければエラー (*)
    2. オンラインだったら Firestore から取得する → 見つからなければエラー (*)
    どれかの段階でヒットすれば getBookSuccess を dispatch
    (*) getBookFail を dispatch
  */
  @Effect()
  getBook: Observable<Action> = this.actions$.pipe(
    ofType<GetBook>(BookActionTypes.GetBook),
    concatMap(async action => {
      if (navigator.onLine == false) {
        const array = await this.resolvedBooks
          .where('isbn')
          .equals(action.payload.isbn)
          .toArray();
        return array.length > 0
          ? new GetBookSuccess({ book: array[0] })
          : new GetBookFail({
              error: 'オフラインで、ローカルDBで本が見つかりませんでした'
            });
      }

      this.afFirestore
        .collection<ResolvedBook>('resolvedBook', ref =>
          ref.where('isbn', '==', action.payload.isbn)
        )
        .valueChanges()
        .pipe(
          take(1),
          map(
            books =>
              books.length !== 0
                ? new GetBookSuccess({ book: books[0] })
                : new GetBookFail({
                    error: 'Firestore 上で本が見つかりませんでした'
                  })
          )
        );
    })
  );
}
