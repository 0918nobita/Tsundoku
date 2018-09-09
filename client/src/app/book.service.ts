import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { DexieService } from './dexie.service';
import { ResolvedBook } from 'shared/entity';
import axios from 'axios';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private functions: firebase.functions.Functions;
  private resolvedBooks: Dexie.Table<ResolvedBook, number>;

  constructor(private dexieService: DexieService,
              private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
    this.resolvedBooks = this.dexieService.table('resolvedBooks');
  }

  async getBookByISBN(isbn: string): Promise<ResolvedBook | null> {
    const localHitBooks = await this.resolvedBooks.where('isbn').equals(isbn).toArray();
    console.log('localHitBooks', localHitBooks);

    const searchBooksInFirestore = (clue: string): Promise<ResolvedBook[]> =>
      this.functions.httpsCallable('searchBooksByISBN')({isbn: clue, usingGoogleBooksAPI: false})
        .then(result => result.data)
        .catch(error => error);

    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then(async result => {
        let hitBooks: ResolvedBook[] = [];
        if (result.data.totalItems > 0) {
          // ヒットした場合は取り出してサムネを出力する
          for (let i = 0; i < result.data.items.length; i++) {
            const volumeInfo = result.data.items[i].volumeInfo,
                  hitBook: ResolvedBook = {
                    desc: volumeInfo.description,
                    donor: 'none',
                    image: './assets/image_not_found.png',
                    isbn,
                    title: volumeInfo.title,
                    pageCount: volumeInfo.pageCount
                  };

            if (volumeInfo.imageLinks === void 0) {
              const books = await searchBooksInFirestore(isbn);
              if (books.length > 0) {
                hitBook.donor = books[0].donor;
                hitBook.image = books[0].image;
              }
            } else {
              hitBook.image = `https${volumeInfo.imageLinks.smallThumbnail.slice(4)}`;
            }

            hitBooks.push(hitBook);
          }
        } else {
          // ヒットしなかった場合は resolvedBooks で検索する
          hitBooks = await searchBooksInFirestore(isbn);
        }

        if (hitBooks.length > 0) {
          await this.resolvedBooks.add(hitBooks[0]);
          return hitBooks[0];
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  }
}
