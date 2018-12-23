import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import 'firebase/auth';
import moment from 'moment';

import { LoginPage } from '../pages/login/login';
import { Store, select } from '@ngrx/store';
import { State } from './state/_state.interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { getUser } from './state/_state.selectors';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav')
  rootNav: Nav;
  rootPage: any;
  firstRun: boolean = true;
  user$: Observable<firebase.User | null | undefined>;
  userSubject: BehaviorSubject<firebase.User | null>;

  constructor(private platform: Platform, private store: Store<State>) {
    moment.locale('ja');

    this.user$ = this.store.pipe(select(getUser));
    this.userSubject = new BehaviorSubject(null);

    this.user$.subscribe(async user => {
      if (user !== null && user !== void 0) {
        this.userSubject.next(user);
        return;
      }

      if (user === null && this.userSubject.getValue() !== null) {
        location.reload();
      }
    });
  }

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
