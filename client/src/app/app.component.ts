import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { LoginPage } from '../pages/login/login';
import { SplitPane } from '../pages/split-pane/split-pane';
import { Store, select } from '@ngrx/store';
import { State } from './state/_state.interfaces';
import { SignIn } from './state/auth.action';
import { Observable } from 'rxjs';
import { getUser } from './state/_state.selectors';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav')
  rootNav;
  rootPage: any;
  firstRun: boolean = true;

  private user$: Observable<firebase.User | null>;

  constructor(private platform: Platform, private store: Store<State>) {}

  ngAfterViewInit() {
    this.store.dispatch(new SignIn());
    this.user$ = this.store.pipe(select(getUser));
    this.user$.subscribe(async user => {
      await this.setRootPage(!user ? LoginPage : SplitPane);
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
