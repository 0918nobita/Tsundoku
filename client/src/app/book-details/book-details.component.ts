import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { ResolvedBook } from 'shared/entity';

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

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const isbn: string = this.activatedRoute.snapshot.params['isbn'];

    this.bookService.getBookByISBN(isbn)
      .then(result => {
        $('app-now-loading').hide();
        if (result === null) return;

        this.title = result.title;
        this.desc = result.desc;
        this.donor = result.donor;
        this.isbn = 'ISBN: ' + result.isbn;
        this.image = result.image;
        this.pageCount = `ページ数: ${ result.pageCount }`;
      })
      .catch(error => console.log(error));
  }
}
