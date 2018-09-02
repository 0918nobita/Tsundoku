import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  private router: Router;

  /**
   * コンポーネントの初期化
   * @param {Router} router - Angular の Router
   */
  constructor(router: Router) {
    /**
     * Angular の Router
     * @private
     * @type {Router} router
     */
    this.router = router;
  }

  ngOnInit() {}
}
