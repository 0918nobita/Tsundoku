import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { ResolvedBook } from '../models/resolved-book';
import { LocalDatabase } from './local-database';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';

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

  attachBookDetails = async <T extends { isbn: string }>(item: T) =>
    Object.assign({}, item, { book: await this.getBookByISBN(item.isbn) });

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

  /*private async getBookOnline(isbn: string): Promise<ResolvedBook> {
    console.log('Google Books API 叩きまーす');
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    let hitBooks: ResolvedBook[] = [];
    if (result.data.totalItems > 0) {
      for (const item of result.data.items) {
        const volumeInfo = item.volumeInfo,
          hitBook: ResolvedBook = {
            ...volumeInfo,
            desc: volumeInfo.description,
            donor: 'none',
            image: 'assets/imgs/image_not_found.png',
            isbn
          };

        if (volumeInfo.imageLinks === void 0) {
          const books = await BookService.searchBooksInFirestore(isbn);
          if (books.length > 0) Object.assign(hitBook, books[0]);
        } else {
          hitBook.image = `https${volumeInfo.imageLinks.smallThumbnail.slice(
            4
          )}`;
        }

        hitBooks.push(hitBook);
      }
    } else {
      hitBooks = await BookService.searchBooksInFirestore(isbn);
    }

    if (hitBooks.length > 0) {
      // データベースに本の情報を登録する
      await this.resolvedBooks.add(hitBooks[0]);
      return hitBooks[0];
    } else {
      throw new Error('本がヒットしませんでした');
    }
  }

  private static async searchBooksInFirestore(
    clue: string
  ): Promise<ResolvedBook[]> {
    return (await firebase.functions().httpsCallable('searchBooksByISBN')({
      isbn: clue,
      usingGoogleBooksAPI: false
    })).data;
  }*/
}
