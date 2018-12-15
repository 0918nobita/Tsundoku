import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { RegisteredBook } from 'shared/entity';
import { BookService } from './book.service';
import { mine } from './firestore-utils';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {
  constructor(
    private afFirestore: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private bookService: BookService
  ) {}

  getBookshelf(): Observable<RegisteredBook> {
    const nextRegisteredBooks = (registeredBooks: RegisteredBook[]) =>
      from(registeredBooks).pipe(
        flatMap(registeredBook =>
          from(this.bookService.embedBookDetails(registeredBook))
        )
      );

    return this.afFirestore
      .collection<RegisteredBook>('bookshelf', mine)
      .valueChanges()
      .pipe(flatMap(nextRegisteredBooks));
  }

  registerBook = (isbn: string): Promise<void> =>
    this.afFunctions
      .httpsCallable('registerBook')({
        isbn,
        uid: (firebase.auth().currentUser as firebase.User).uid
      })
      .toPromise();

  unregisterBook = async (isbn: string): Promise<void> =>
    this.afFunctions
      .httpsCallable('unregisterBook')({
        isbn,
        uid: (firebase.auth().currentUser as firebase.User).uid
      })
      .toPromise();
}
