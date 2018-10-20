import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';

import { RegisteredBook } from '../../../../shared/entity';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  constructor(
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  getBookshelf(name: string): Observable<RegisteredBook> {
    return this.afFirestore
      .collection<RegisteredBook>('bookshelf', ref =>
        ref.where('user', '==', name)
      )
      .valueChanges()
      .pipe(
        flatMap(x =>
          from(x).pipe(
            flatMap(book =>
              from(
                this.bookService.getBookByISBN(book.isbn).then(
                  resolvedBook =>
                    <RegisteredBook>{
                      ...resolvedBook,
                      ...book
                    }
                )
              )
            )
          )
        )
      );
  }
}
