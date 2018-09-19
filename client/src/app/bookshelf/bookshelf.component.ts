import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

import { RegisteredBook } from 'shared/entity';
import { AccountService } from '../services/account.service';
import { FirebaseService } from '../services/firebase.service';

/** 積読本棚画面 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  registeredBooks: RegisteredBook[] = [];

  public functions: firebase.functions.Functions;

  constructor(private accountService: AccountService,
              private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
  }

  ngOnInit() {
    this.accountService.afterLogin((_, user) => {
      this.getBookshelf(user.name)
        .then(result => {
          $('app-now-loading').hide();
          this.registeredBooks = result;
        })
        .catch(error => console.log(error));
    });
  }

  private getBookshelf(name: string): Promise<RegisteredBook[]> {
    return this.functions.httpsCallable('getBookshelf')(name)
      .then(result => result.data)
      .catch(error => error);
  }
}
