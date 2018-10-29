import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import firebase from 'firebase/app';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { firebaseConfig } from './config';
import { DexieService } from './services/dexie.service';

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
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private dexieService: DexieService
  ) {
    firebase.initializeApp(firebaseConfig);
  }

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

      await this.setRootPage(TabsPage);
    });
  }

  async setRootPage(page) {
    if (this.firstRun) {
      await this.rootNav.setRoot(page);
      await this.platform.ready();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firstRun = false;
    } else {
      await this.rootNav.setRoot(page);
    }
  }
}
