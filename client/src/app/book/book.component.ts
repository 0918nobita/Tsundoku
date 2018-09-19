import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

/**
 * 本棚画面や検索画面で表示される、<br>
 * 「本のサムネイル」と「サムネイルをクリックした時に表示される詳細画面」
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {
  @Input() public title: string;
  @Input() public isbn: string;
  @Input() public image: string;
  @Input() public favorite: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.favorite === true) {
      $('#star' + this.isbn).css('display', 'block');
    }
  }

  /** 本の詳細ページに遷移する */
  show() {
    this.router.navigate([`/bookDetails/${this.isbn}`]);
  }
}
