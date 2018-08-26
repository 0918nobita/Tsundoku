import axios from 'axios';
import { config } from '../config';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';

declare var $;

interface ResolvedBook {
  desc: string;
  donor: string;
  image: string;
  isbn: string;
  title: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  ngOnInit() {}

  hitBooks: Array<ResolvedBook> = [];
  content = '';
  functions: firebase.functions.Functions;

  constructor() {
    firebase.initializeApp(config);

    this.functions = firebase.functions();
  }

  search(isbn: string) {
    if ((isbn.length !== 10) && (isbn.length !== 13)) {
      $('#errorModal').modal();
      return;
    }

    const searchBooksByISBN = (isbn: string): Promise<Array<ResolvedBook>> =>
      this.functions.httpsCallable('searchBooksByISBN')(isbn)
        .then(result => result.data)
        .catch(error => error);

    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
      .then(async result => {
        this.hitBooks = [];

        if (result.data.items !== void 0) {
          // ヒットした場合は取り出してサムネを出力する
          result.data.items.map((item, index) =>
            this.hitBooks.push({
              desc: item.volumeInfo.description,
              donor: 'none',
              image: 'https' + item.volumeInfo.imageLinks.smallThumbnail.slice(4),
              isbn: isbn,
              title: item.volumeInfo.title
            }));
        } else {
          // ヒットしなかった場合は resolvedBooks で検索する
          this.hitBooks = await searchBooksByISBN(isbn);
        }
      })
      .catch(error => 'Error: ' + error);
  }
}
