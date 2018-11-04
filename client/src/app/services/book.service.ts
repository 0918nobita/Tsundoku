import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/functions';
import Dexie from 'dexie';
import axios from 'axios';

import { ResolvedBook } from 'shared/entity';
import { DexieService } from './dexie.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private resolvedBooks: Dexie.Table<ResolvedBook, number>;

  constructor(private dexieService: DexieService) {
    this.resolvedBooks = this.dexieService.table('resolvedBooks');
  }

  async getBookByISBN(isbn: string): Promise<ResolvedBook> {
    const localBooks = await this.resolvedBooks
      .where('isbn')
      .equals(isbn)
      .toArray();
    if (localBooks.length > 0) {
      return localBooks[0];
    } else if (navigator.onLine) {
      return await this.getBookOnline(isbn);
    } else {
      throw new Error('本の情報の取得に失敗しました');
    }
  }

  private async getBookOnline(isbn: string): Promise<ResolvedBook> {
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
          if (books.length > 0)
            Object.assign(hitBook, {
              donor: books[0].donor,
              image: books[0].image
            });
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
  }
}
