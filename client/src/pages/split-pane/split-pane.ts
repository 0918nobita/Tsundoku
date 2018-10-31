import { Component } from '@angular/core';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'split-pane',
  templateUrl: 'split-pane.html'
})
export class SplitPane {
  root = TabsPage;

  constructor() {}

  ionViewWillEnter() {}
}
