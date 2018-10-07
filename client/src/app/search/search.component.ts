import { Component, OnInit } from '@angular/core';

import { ResolvedBook } from 'shared/entity';
import { BookService } from '../services/book.service';

/** 本の検索画面 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isbn: string;
  hitBooks: ResolvedBook[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  async search(isbn: string) {
    if (isbn.length !== 10 && isbn.length !== 13) {
      $('#errorModal').modal();
      return;
    }

    try {
      const result = await this.bookService.getBookByISBN(isbn);
      this.hitBooks.pop();
      this.hitBooks.push(result);
    } catch (error) {
      console.error(error);
    }
  }
}
