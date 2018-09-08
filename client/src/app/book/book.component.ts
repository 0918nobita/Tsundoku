import { Component, OnInit, Input } from '@angular/core';
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
export class BookComponent implements OnInit {
  @Input() public title: string;
  @Input() public author: string;
  @Input() public desc: string;
  @Input() public isbn: string;
  @Input() public image: string;

  private visible = false;

  constructor() {}

  ngOnInit() {}

  /** 本の詳細を表示する */
  show(isbn: string) {
    if (this.visible === false) {
      console.log(isbn);
      $('.bg' + isbn).show();
      $('.filter' + isbn).show();
      $('.details' + isbn).show();
      this.visible = true;
    }
  }

  /** 本の詳細の表示を終了する */
  close(isbn: string) {
    $('.details' + isbn).hide();
    $('.filter' + isbn).hide();
    $('.bg' + isbn).hide();
    this.visible = false;
  }
}
