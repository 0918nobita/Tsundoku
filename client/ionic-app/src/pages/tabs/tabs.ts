import { Component } from '@angular/core';

import { AboutPage } from '../progress/progress';
import { ContactPage } from '../achievement/achievement';
import { HomePage } from '../bookshelf/bookshelf';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
