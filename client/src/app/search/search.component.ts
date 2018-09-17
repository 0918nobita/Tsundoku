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

  hitBooks: ResolvedBook[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  search(isbn: string) {
    if ((isbn.length !== 10) && (isbn.length !== 13)) {
      $('#errorModal').modal();
      return;
    }

    this.bookService.getBookByISBN(isbn)
      .then(result => {
        if (result === null) return;

        this.hitBooks.pop();
        this.hitBooks.push(result);
      })
      .catch(error => console.log(error));
  }
}
