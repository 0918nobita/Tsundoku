import { Component, ChangeDetectorRef } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, analytics, stats } from 'instantsearch.js/es/widgets';
import { algoliaConfig } from '../../../app/config';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'search-page.html'
})
export class SearchPage {
  search: any;
  hits$: Subject<{ isbn: string; Content: string }[]>;
  title: string;

  constructor(private cdRef: ChangeDetectorRef) {
    this.hits$ = new Subject();
  }

  ngOnInit() {
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
      analytics({
        delay: () => 0,
        pushFunction: (_: any, __: any, results: any) => {
          this.hits$.next(results.hits);
        }
      })
    );

    this.search.start();
  }

  ngAfterViewInit() {
    const searchBox = document.getElementById('search-box');
    if (searchBox === null) return;
    searchBox.childNodes[0].childNodes[0].addEventListener('keyup', () => {
      this.cdRef.detectChanges();
    });
  }
}
