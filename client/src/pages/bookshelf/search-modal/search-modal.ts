import { FundamentalModal } from '../../../pages/fundamental-modal';
import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import instantsearch from 'instantsearch.js/es';
import { searchBox, analytics } from 'instantsearch.js/es/widgets';
import { algoliaConfig } from '../../../app/config';
import { Subject } from 'rxjs';

@Component({
  selector: 'search-modal',
  templateUrl: 'search-modal.html'
})
export class SearchModal extends FundamentalModal {
  search: any;
  hits$: Subject<{ isbn: string; Content: string }[]>;
  mode: 'isbn' | 'skill';
  title: string;

  constructor(
    params: NavParams,
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
    this.hits$ = new Subject();
    this.mode = params.get('mode');
    this.title =
      this.mode === 'isbn' ? 'ISBN で本を検索する' : 'スキルを検索する';
  }

  ngOnInit() {
    this.search = instantsearch(algoliaConfig);

    this.search.addWidget(
      searchBox({
        container: '#search-box',
        autofocus: false,
        placeholder: 'フリーワードでスキルを検索'
      })
    );

    this.search.addWidget(
      analytics({
        pushFunction: (_: any, __: any, results: any) => {
          this.hits$.next(results.hits);
        }
      })
    );

    this.search.start();
  }
}
