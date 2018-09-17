import { Component, OnInit } from '@angular/core';
import { Progress } from 'shared/progress';
import { RegisteredBook } from 'shared/entity';
import { FirebaseService } from '../services/firebase.service';
import { AccountService } from '../services/account.service';
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

  constructor(private accountSerice: AccountService,
              private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
  }

  ngOnInit() {
    this.getBookshelf('0918nobita').then(result => {
      $('app-now-loading').hide();
      this.registeredBooks = result;
    }).catch(error => console.log(error));
  }

  private getBookshelf(name: string): Promise<RegisteredBook[]> {
    return this.functions.httpsCallable('getBookshelf')(name)
      .then(result => result.data)
      .catch(error => error);
  }
}
