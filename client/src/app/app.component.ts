import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login';
import { DexieService } from './services/dexie.service';
import { SplitPane } from '../pages/split-pane/split-pane';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav')
  rootNav;
  rootPage: any;
  firstRun: boolean = true;

  constructor(
    private platform: Platform,
    private dexieService: DexieService
  ) {}

  ngAfterViewInit() {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await Promise.all([
          this.dexieService.table('resolvedBooks').clear(),
          this.dexieService.table('registeredBooks').clear(),
          this.setRootPage(LoginPage)
        ]);
        return;
      }

      await this.setRootPage(SplitPane);
    });
  }

  async setRootPage(page) {
    if (this.firstRun) {
      await this.rootNav.setRoot(page);
      await this.platform.ready();
      this.firstRun = false;
    } else {
      await this.rootNav.setRoot(page);
    }
  }
}
