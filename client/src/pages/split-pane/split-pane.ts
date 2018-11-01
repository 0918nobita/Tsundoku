import { Component, ElementRef, ViewChild } from '@angular/core';

import { TabsPage } from '../tabs/tabs';
import { Events, Nav } from 'ionic-angular';

@Component({
  selector: 'split-pane',
  templateUrl: 'split-pane.html'
})
export class SplitPane {
  @ViewChild(Nav)
  navRef: Nav;

  @ViewChild('progress', { read: ElementRef })
  private progressButton: ElementRef;

  @ViewChild('bookshelf', { read: ElementRef })
  private bookshelfButton: ElementRef;

  @ViewChild('achievement', { read: ElementRef })
  private achievementButton: ElementRef;

  root = TabsPage;

  constructor(private events: Events) {}

  ionViewWillEnter() {
    this.events.subscribe('tabs:changed', index =>
      this.makeButtonSelected(index)
    );
  }

  showProgressPage() {
    this.makeButtonSelected(1);
    this.navRef.getActiveChildNavs()[0].select(1);
  }

  showBookshelfPage() {
    this.makeButtonSelected(0);
    this.navRef.getActiveChildNavs()[0].select(0);
  }

  showAchievementPage() {
    this.makeButtonSelected(2);
    this.navRef.getActiveChildNavs()[0].select(2);
  }

  makeButtonSelected(index: 0 | 1 | 2) {
    const buttons = [
      this.bookshelfButton,
      this.progressButton,
      this.achievementButton
    ];
    buttons[index].nativeElement.classList.add('selected-button');
    buttons
      .filter((_, i) => i !== index)
      .forEach(item => item.nativeElement.classList.remove('selected-button'));
  }
}
