import { FundamentalModal } from '../../fundamental-modal';
import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import instantsearch from 'instantsearch.js/es';
import {
  searchBox,
  analytics,
  pagination,
  stats
} from 'instantsearch.js/es/widgets';
import { algoliaConfig } from '../../../app/config';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'search-page.html'
})
export class SearchPage extends FundamentalModal {
  search: any;
  hits$: Subject<{ isbn: string; Content: string }[]>;
  title: string;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
    this.hits$ = new Subject();
  }

  ngAfterViewInit() {
    this.search = instantsearch(algoliaConfig);

    this.search.addWidget(
      searchBox({
        container: '#search-box',
        autofocus: true,
        placeholder: 'フリーワードでスキルを検索',
        poweredBy: true
      })
    );

    this.search.addWidget(
      stats({
        container: '#stats'
      })
    );

    this.search.addWidget(
      pagination({
        container: '#pagination',
        maxPages: 20
      })
    );

    this.search.addWidget(
      analytics({
        delay: () => 0,
        pushFunction: (_: any, __: any, results: any) => {
          console.log(results);
          this.hits$.next(results.hits);
        }
      })
    );

    this.search.start();
  }
}
