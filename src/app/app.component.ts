import { Component } from '@angular/core';
import { config } from './config';

import * as firebase from 'firebase/app';
import 'firebase/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  books: any = [];

  constructor() {
    firebase.initializeApp(config);

    const functions = firebase.functions();

    functions.httpsCallable('getBooks')()
      .then(result => { this.books = result.data; })
      .catch(error => console.log(error.details));

    functions.httpsCallable('searchBooks')('Programming Rust')
      .then(result => console.log('search: ', result))
      .catch(error => console.log(error));
  }
}
