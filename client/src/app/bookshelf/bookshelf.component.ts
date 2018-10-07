import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FirebaseFunctions } from '@angular/fire';
import { AngularFireFunctions } from '@angular/fire/functions';
import { take } from 'rxjs/operators';

import { RegisteredBook } from 'shared/entity';
import { AccountService } from '../services/account.service';
import { BookshelfService } from '../services/bookshelf.service';

/** 積読本棚画面 */
@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {
  registeredBooks: RegisteredBook[] = [];

  private functions: FirebaseFunctions;

  constructor(
    private accountService: AccountService,
    private bookshelfService: BookshelfService,
    private afFunctions: AngularFireFunctions
  ) {
    this.functions = this.afFunctions.functions;
  }

  ngOnInit() {
    const user = this.accountService.loginSubject.value;
    if (user == null) return;
    const getBookshelf$ = this.bookshelfService.getBookshelf(user.name);

    getBookshelf$.pipe(take(1)).subscribe(() => {
      $('app-now-loading').hide();
    });

    getBookshelf$.subscribe(book => {
      if (this.registeredBooks.indexOf(book) === -1)
        this.registeredBooks.push(book);
    });
  }
}
