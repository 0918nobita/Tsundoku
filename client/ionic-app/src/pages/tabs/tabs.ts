import { Component } from '@angular/core';

import { ProgressPage } from '../progress/progress';
import { AchievementPage } from '../achievement/achievement';
import { BookshelfPage } from '../bookshelf/bookshelf';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = BookshelfPage;
  tab2Root = ProgressPage;
  tab3Root = AchievementPage;

  constructor() {}
}
