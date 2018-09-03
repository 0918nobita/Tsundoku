import { Component, OnInit } from '@angular/core';
import { Progress } from 'shared/progress';
import { FirebaseService } from '../firebase.service';
import * as firebase from 'firebase';

interface RegisteredBook {
  deadline: firebase.firestore.Timestamp;
  favorite: boolean;
  isbn: string;
  progress: Progress;
}

/**
 * 積読本棚画面
 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  books: Array<RegisteredBook> = [];

  public functions: firebase.functions.Functions;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.functions = this.firebaseService.functions;
    this.getBookshelf('0918nobita').then(result => {
      this.books = result;
    }).catch(error => console.log(error));
  }

  private async getBookshelf(user: string): Promise<Array<RegisteredBook>> {
    return this.functions.httpsCallable('getBookshelf')(user)
      .then(result => result.data)
      .catch(error => error);
  }
}
