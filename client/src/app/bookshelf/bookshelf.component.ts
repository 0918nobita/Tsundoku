import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

import { RegisteredBook, User } from 'shared/entity';
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
    this.accountService.loginSubject.subscribe(async (user: User) => {
      try {
        const result = await this.getBookshelf(user.name);
        $('app-now-loading').hide();
        this.registeredBooks = result;
      } catch (error) {
        console.error(error);
      }
    });
  }

  private async getBookshelf(name: string) {
    try {
      return (await this.functions.httpsCallable('getBookshelf')(name)).data;
    } catch (error) {
      console.error(error);
    }
  }
}
