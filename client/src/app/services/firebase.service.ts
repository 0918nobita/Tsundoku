import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import { firebaseConfig } from '../config';
import { /*concat, from,*/ fromEvent, /*interval,*/ merge, of/*, Observable, of*/ } from 'rxjs';
import { filter/*, map, mergeMap, pluck, skip, tap*/ } from 'rxjs/operators';

/**
 * Firebase SDK の設定を各コンポーネントで共有するための、Angular の Service
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public auth: firebase.auth.Auth;
  public functions: firebase.functions.Functions;

  /** Firebase SDK の設定 */
  constructor() {
    const observable = merge(
        of(navigator.onLine),
        fromEvent(window, 'online'))
          .pipe(filter(x => (x !== false)));

    observable.subscribe(() => {
      firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
      this.functions = firebase.functions();
    });
  }
}
