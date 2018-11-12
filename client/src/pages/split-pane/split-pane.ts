import {
  Component,
  ElementRef,
  ViewChild,
  ApplicationRef
} from '@angular/core';

import { TabsPage } from '../tabs/tabs';
import { Events, ModalController, Nav } from 'ionic-angular';
import { SettingsModal } from '../settings-button/settings-modal/settings-modal';

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

  constructor(
    private events: Events,
    private modalCtrl: ModalController,
    private appRef: ApplicationRef
  ) {}

  ionViewWillEnter() {
    this.events.subscribe('tabs:changed', index => {
      this.makeButtonSelected(index);
      this.appRef.tick();
    });
  }

  showPage(name: 'progress' | 'bookshelf' | 'achievement') {
    const index = ['bookshelf', 'progress', 'achievement'].indexOf(name);
    this.makeButtonSelected(index);
    this.navRef.getActiveChildNavs()[0].select(index);
  }

  makeButtonSelected(index: number) {
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

  async openSettingsModal() {
    await this.modalCtrl.create(SettingsModal).present();
  }
}
