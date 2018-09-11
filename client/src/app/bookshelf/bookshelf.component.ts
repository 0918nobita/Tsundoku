import { Component, OnInit } from '@angular/core';
import { Progress } from 'shared/progress';
import { RegisteredBook } from 'shared/entity';
import { FirebaseService } from '../firebase.service';
import * as firebase from 'firebase';
import * as $ from 'jquery';

/** 積読本棚画面 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  registeredBooks: RegisteredBook[] = [];

  public functions: firebase.functions.Functions;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.functions = this.firebaseService.functions;
    this.getBookshelf('0918nobita').then(result => {
      $('#now_loading').hide();
      this.registeredBooks = result;
    }).catch(error => console.log(error));
  }

  private async getBookshelf(user: string): Promise<RegisteredBook[]> {
    return this.functions.httpsCallable('getBookshelf')(user)
      .then(result => result.data)
      .catch(error => error);
  }
}
