import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav')
  rootNav;
  rootPage: any;
  firstRun: boolean = true;

  constructor(private platform: Platform) {}

  ngAfterViewInit() {
    if (this.firstRun) {
      this.rootNav.setRoot(LoginPage);
      this.platform.ready();
      this.firstRun = false;
    } else {
      this.rootNav.setRoot(LoginPage);
    }
  }
}
