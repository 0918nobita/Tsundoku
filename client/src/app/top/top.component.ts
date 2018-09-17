import { Component, OnInit } from '@angular/core';

declare var $;  // jQuery

/**
 * トップページ
 */
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
