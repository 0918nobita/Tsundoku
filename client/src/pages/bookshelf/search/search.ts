import { Component, ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class Search {
  searchMethod = 'isbn';

  constructor(private cf: ChangeDetectorRef, private events: Events) {}

  segmentChanged() {
    this.events.publish('searchMethod:changed', this.searchMethod);
    this.cf.detectChanges();
  }
}
