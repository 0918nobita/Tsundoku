import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { ResolvedBook } from '../models/resolved-book';
import { LocalDatabase } from './local-database';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { RegisteredBook } from '../models/registered-book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private resolvedBooks: Dexie.Table<ResolvedBook, number>;

  constructor(
    private localDB: LocalDatabase,
    private afFirestore: AngularFirestore
  ) {
    this.resolvedBooks = this.localDB.table('resolvedBooks');
  }

  embedBookDetails = async <T extends { isbn: string }>(item: T) =>
    Object.assign({}, item, await this.getBookByISBN(item.isbn));

  async getBookByISBN(isbn: string): Promise<ResolvedBook | null> {
    if (navigator.onLine === false) {
      const array = await this.resolvedBooks
        .where('isbn')
        .equals(isbn)
        .toArray();
      if (array.length > 0) return array[0];
      throw new Error('ローカルDBで本が見つかりませんでした');
    }

    return this.afFirestore
      .collection<ResolvedBook>('resolvedBooks', ref =>
        ref.where('isbn', '==', isbn)
      )
      .valueChanges()
      .pipe(
        take(1),
        map(books => (books.length !== 0 ? books[0] : null))
      )
      .toPromise();
  }

  isOwnedBy = (isbn: string, uid: string): Observable<boolean> =>
    this.afFirestore
      .collection<RegisteredBook>('bookshelf', ref =>
        ref.where('isbn', '==', isbn)
      )
      .valueChanges()
      .pipe(map(books => books.filter(book => book.uid === uid).length > 0));
}
