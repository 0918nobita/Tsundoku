import { FundamentalModal } from '../../../pages/fundamental-modal';
import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import instantsearch from 'instantsearch.js/es';
import { searchBox, analytics } from 'instantsearch.js/es/widgets';
import { algoliaConfig } from '../../../app/config';
import { Subject } from 'rxjs';

@Component({
  selector: 'search-modal',
  templateUrl: 'search-modal.html'
})
export class SearchModal extends FundamentalModal {
  search;
  hits$: Subject<{ isbn: string; Content: string }[]>;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
    this.hits$ = new Subject();
  }

  ngOnInit() {
    this.search = instantsearch(algoliaConfig);

    this.search.addWidget(
      searchBox({
        container: '#search-box',
        autofocus: false,
        placeholder: 'ISBN 13桁で本を検索、またはスキルを検索する'
      })
    );

    this.search.addWidget(
      analytics({
        pushFunction: (query, state, results) => {
          this.hits$.next(results.hits);
        }
      })
    );

    this.search.start();
  }
}
