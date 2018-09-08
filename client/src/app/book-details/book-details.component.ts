import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { BookshelfService } from '../bookshelf.service';
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

  constructor(private location: Location,
              private bookshelfService: BookshelfService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const isbn: string = this.activatedRoute.snapshot.params['isbn'];

    this.bookshelfService.getBookByISBN(isbn)
      .then(result => {
        $('#now_loading').hide();
        if (result === null) return;

        this.title = result.title;
        this.desc = result.desc;
        this.donor = result.donor;
        this.isbn = 'ISBN: ' + result.isbn;
        this.image = result.image;
      })
      .catch(error => console.log(error));
  }

  back() {
    this.location.back();
  }
}
