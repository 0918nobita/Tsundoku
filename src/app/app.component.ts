import axios from 'axios';
import { Component } from '@angular/core';
import { config } from './config';
import * as firebase from 'firebase/app';
import 'firebase/functions';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  books: any = [];
  hitBooks: any = [];
  content = '';

  constructor() {
    firebase.initializeApp(config);

    const functions = firebase.functions();

    functions.httpsCallable('getBooks')()
      .then(result => { this.books = result.data; })
      .catch(error => console.log(error.details));
  }

  search(text: string) {
    if ((text.length !== 10) && (text.length !== 13)) {
      $('#errorModal').modal();
      return;
    }

    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + text)
      .then(result => {
        this.hitBooks = [];
        console.log('search: ', result);
        result.data.items.map((item, index) =>
          this.hitBooks.push('https' + item.volumeInfo.imageLinks.smallThumbnail.slice(4)));
      })
      .catch(error => 'Error: ' + error); 
  }
}
