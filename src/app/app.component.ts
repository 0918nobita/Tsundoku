import axios from 'axios';
import { Component } from '@angular/core';
import { config } from './config';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})

export class AppComponent {
  books: any = [];
  hitBooks: Array<string> = [];
  content = '';
  functions: firebase.functions.Functions;

  constructor() {
    firebase.initializeApp(config);

    this.functions = firebase.functions();
  }

  search(text: string) {
    if ((text.length !== 10) && (text.length !== 13)) {
      $('#errorModal').modal();
      return;
    }

    const searchBooksByISBN = (isbn: string): Promise<Array<ResolvedBook>> =>
      this.functions.httpsCallable('searchBooksByISBN')(isbn)
        .then(result => result.data)
        .catch(error => error);

    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + text)
      .then(async result => {
        this.hitBooks = [];

        if (result.data.items !== void 0) {
          // ヒットした場合は取り出してサムネを出力する
          result.data.items.map((item, index) =>
            this.hitBooks.push('https' + item.volumeInfo.imageLinks.smallThumbnail.slice(4)));
        } else {
          // ヒットしなかった場合は resolvedBooks で検索する
          const books = await searchBooksByISBN(text);
          books.map(item => this.hitBooks.push(item.image));
        }
      })
      .catch(error => 'Error: ' + error);
  }
}
