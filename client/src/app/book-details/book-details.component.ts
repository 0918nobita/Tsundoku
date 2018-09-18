import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Progress } from 'shared/progress';
import { BookService } from '../services/book.service';
import { FirebaseService } from '../services/firebase.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  title: string;
  desc: string;
  donor: string;
  isbn: string;
  image: string;
  pageCount: string;
  records: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private firebaseService: FirebaseService,
              private userService: UserService) {}

  async ngOnInit() {

    const convertDateTime = timestamp => {
      const pad = input => (input < 10) ? '0' + input : input;
      const date = timestamp ? new Date(timestamp * 1000) : new Date();
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ` +
          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const isbn: string = this.activatedRoute.snapshot.params['isbn'];

    try {
      const book = await this.bookService.getBookByISBN(isbn);
      $('app-now-loading').hide();
      if (book === null) return;
      this.title = book.title;
      this.desc = book.desc;
      this.donor = book.donor;
      this.isbn = 'ISBN: ' + book.isbn;
      this.image = book.image;
      this.pageCount = `ページ数: ${ book.pageCount }`;
      this.records = await this.getRecordsByISBN(book.isbn);
      for (let i = 0; i < this.records.length; i++) {
        this.records[i].range =
          (new Progress(this.records[i].range.fragments)).toString()
            .replace(/-/g, '〜') + 'ページ';
        this.records[i].created = convertDateTime(this.records[i].created._seconds);
        const user = await this.userService.getUserByName(this.records[i].user);
        this.records[i].screenName = user.screenName;
        this.records[i].image = user.image;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private getRecordsByISBN = (isbn: string) =>
    this.firebaseService.functions.httpsCallable('getRecordsByISBN')(isbn)
      .then(result => result.data)
}
