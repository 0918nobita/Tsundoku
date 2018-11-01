import { Component } from '@angular/core';

import { ProgressPage } from '../progress/progress';
import { AchievementPage } from '../achievement/achievement';
import { BookshelfPage } from '../bookshelf/bookshelf';
import { Events, Tab } from 'ionic-angular';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = BookshelfPage;
  tab2Root = ProgressPage;
  tab3Root = AchievementPage;

  constructor(private events: Events) {}

  switchTabs(tab: Tab) {
    this.events.publish('tabs:changed', tab.index);
  }
}
