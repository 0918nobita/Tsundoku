import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ResolvedBook } from 'shared/entity';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  private functions: firebase.functions.Functions;

  constructor(private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
  }

  getBookByISBN(isbn: string): Promise<ResolvedBook | null> {
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

        return (hitBooks.length > 0) ? hitBooks[0] : null;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
  }
}
