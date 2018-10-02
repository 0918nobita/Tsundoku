import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { firebaseConfig } from '../config';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Firebase SDK の設定を各コンポーネントで共有するための、Angular の Service
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public observable: Observable<boolean | Event>;

  /** Firebase SDK の設定 */
  constructor() {
    this.observable = merge(
        of(navigator.onLine), fromEvent(window, 'online'))
            .pipe(filter(x => (x !== false)));

    this.observable.subscribe(() => {
      firebase.initializeApp(firebaseConfig);
    });
  }
}
