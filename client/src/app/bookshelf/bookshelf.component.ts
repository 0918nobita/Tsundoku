import { Component, OnDestroy, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FirebaseFunctions } from '@angular/fire';
import { AngularFireFunctions } from '@angular/fire/functions';

import { RegisteredBook, User } from 'shared/entity';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';

/** 積読本棚画面 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit, OnDestroy {

  registeredBooks: RegisteredBook[] = [];

  private functions: FirebaseFunctions;
  private subscription: Subscription;

  constructor(private accountService: AccountService,
              private afFunctions: AngularFireFunctions) {
    this.functions = this.afFunctions.functions;
  }

  ngOnInit() {
    this.subscription = this.accountService.login$.subscribe(async (user: User | null): Promise<void> => {
      if (user == null) return;
      try {
        const result = await this.getBookshelf(user.name);
        console.log('result: ', result);
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
    return (await this.functions.httpsCallable('getBookshelf')(name)).data;
  }
}
