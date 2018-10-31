import { Component, ViewChild } from '@angular/core';

import { TabsPage } from '../tabs/tabs';
import { Nav } from 'ionic-angular';

@Component({
  selector: 'split-pane',
  templateUrl: 'split-pane.html'
})
export class SplitPane {
  @ViewChild(Nav)
  navRef: Nav;
  root = TabsPage;

  constructor() {}

  ionViewWillEnter() {}

  showProgressPage() {
    this.navRef.getActiveChildNav().select(1);
  }

  showBookshelfPage() {
    this.navRef.getActiveChildNav().select(0);
  }

  showAchievementPage() {
    this.navRef.getActiveChildNav().select(2);
  }
}
