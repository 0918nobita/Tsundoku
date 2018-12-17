import { FundamentalModal } from '../../fundamental-modal';
import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import instantsearch from 'instantsearch.js/es';
import { searchBox, analytics } from 'instantsearch.js/es/widgets';
import { algoliaConfig } from '../../../app/config';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'search-skill-modal.html'
})
export class SearchSkillModal extends FundamentalModal {
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
