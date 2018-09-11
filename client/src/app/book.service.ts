import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { FirebaseService } from './firebase.service';
import { ResolvedBook } from 'shared/entity';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private functions: firebase.functions.Functions;

  constructor(private databaseService: DatabaseService,
              private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
  }

  async getBookByISBN(isbn: string): Promise<ResolvedBook | null> {
    return new Promise(async (resolve: (value?:  ResolvedBook) => void,
                              reject:  (reason?: any)          => void) => {
      const transaction = this.databaseService.db.transaction(['resolved-books'], 'readonly');
      transaction.oncomplete = () => console.log('トランザクションが完了しました');
      transaction.onerror = () => console.log('トランザクションが失敗しました');

      const resolvedBooks = transaction.objectStore('resolved-books');
      const request = resolvedBooks.get(isbn);
      request.onsuccess = async event => {
        const result = (<IDBRequest>event.target).result;
        console.log('hitBook: ', result);
        if (result !== void 0) resolve(<ResolvedBook>result);
        else await searchBooksOnline();
      };
      request.onerror = () => reject();

      // console.log(this.databaseService.resolvedBooks.index('image'));

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
              // データベースに本の情報を登録する
              resolve(hitBooks[0]);
            } else {
              resolve(null);
            }
          })
          .catch(error => reject(error));
        });
  }
}
