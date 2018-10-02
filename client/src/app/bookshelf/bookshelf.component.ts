import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

import { RegisteredBook, User } from 'shared/entity';
import { AccountService } from '../services/account.service';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';

/** 積読本棚画面 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit, OnDestroy {

  registeredBooks: RegisteredBook[] = [];

  private functions: firebase.functions.Functions;
  private subscription: Subscription;

  constructor(private accountService: AccountService,
              private firebaseService: FirebaseService) {
    this.functions = this.firebaseService.functions;
  }

  ngOnInit() {
    this.subscription = this.accountService.login$.subscribe(async (user: User | null): Promise<void> => {
      if (user == null) return;
      try {
        const result = await this.getBookshelf(user.name);
        $('app-now-loading').hide();
        this.registeredBooks = result;
      } catch (error) {
        console.error(error);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async getBookshelf(name: string) {
    try {
      return (await this.functions.httpsCallable('getBookshelf')(name)).data;
    } catch (error) {
      console.error(error);
    }
  }
}
