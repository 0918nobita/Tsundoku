import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Record } from 'shared/entity';
import { BookService } from '../services/book.service';
import { RecordService } from '../services/record.service';

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
  records: Record[];

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private recordService: RecordService) {}

  async ngOnInit() {

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

      this.records = await this.recordService.getRecordsByISBN(book.isbn);
    } catch (error) {
      console.error(error);
    }
  }
}
