import { Injectable } from '@angular/core';
import { DexieService } from './dexie.service';
import { FirebaseService } from './firebase.service';
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
    return new Promise(async (resolve: (value?:  ResolvedBook) => void,
                              reject:  (reason?: any)          => void) => {
      const searchBooksOnline = async () =>
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
          .then(async result => {
            console.log('Google Book API を用いて検索します');

            const searchBooksInFirestore = (clue: string): Promise<ResolvedBook[]> =>
              this.functions.httpsCallable('searchBooksByISBN')({isbn: clue, usingGoogleBooksAPI: false})
                .then(result => result.data)
                .catch(error => error);

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
                  if (books.length > 0)
                    Object.assign(hitBook, { donor: books[0].donor, image: books[0].image });
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
              // データベースに本の情報を登録する
              this.resolvedBooks.add(hitBooks[0]);
              resolve(hitBooks[0]);
            } else {
              resolve(null);
            }
          })
          .catch(error => reject(error));

      const localBooks = await this.resolvedBooks.where('isbn').equals(isbn).toArray();
      if (localBooks.length > 0) {
        resolve(localBooks[0]);
      } else if (navigator.onLine === true) {
        await searchBooksOnline();
      } else {
        console.log('オフライン状態なので、検索ができませんでした');
        resolve(null);
      }
    });
  }
}
