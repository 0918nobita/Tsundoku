import axios from 'axios';
import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ResolvedBook } from 'shared/entity';
import * as $ from 'jquery';

/**
 * 本の検索画面
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  hitBooks: Array<ResolvedBook> = [];
  content = '';

  /**
   * FirebaseService のプロパティの参照を取得するプロパティ
   * @type {firebase.functions.Functions}
   * @memberof TopComponent
   */
  public functions: firebase.functions.Functions;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.functions = this.firebaseService.functions;
  }

  search(isbn: string) {
    if ((isbn.length !== 10) && (isbn.length !== 13)) {
      $('#errorModal').modal();
      return;
    }

    const searchBooksByISBN = (clue: string): Promise<Array<ResolvedBook>> =>
      this.functions.httpsCallable('searchBooksByISBN')(clue)
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
