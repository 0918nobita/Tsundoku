import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';

import { RegisteredBook } from 'shared/entity';
import { BookService } from './book.service';
import { mine } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  constructor(
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  getBookshelf(): Observable<RegisteredBook> {
    const attachBookDetails = (book: RegisteredBook) =>
      this.bookService
        .getBookByISBN(book.isbn)
        .then(resolvedBook => <RegisteredBook>{ ...resolvedBook, ...book });

    const nextRegisteredBooks = (registeredBooks: RegisteredBook[]) =>
      from(registeredBooks).pipe(
        flatMap(registeredBook => from(attachBookDetails(registeredBook)))
      );

    return this.afFirestore
      .collection<RegisteredBook>('bookshelf', mine)
      .valueChanges()
      .pipe(flatMap(nextRegisteredBooks));
  }
}
