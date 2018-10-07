import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';

import { firebaseConfig } from '../config';

/**
 * Firebase SDK の設定を各コンポーネントで共有するための、Angular の Service
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public behaviorSubject = new BehaviorSubject(navigator.onLine);
  public observable = this.behaviorSubject.asObservable();
  private initialized = false;

  /** Firebase SDK の設定 */
  constructor() {
    merge(fromEvent(window, 'online'), fromEvent(window, 'offline')).subscribe(
      event => {
        this.behaviorSubject.next(event.type === 'online');
      }
    );

    this.observable.subscribe(online => {
      if (this.initialized || !online) return;
      firebase.initializeApp(firebaseConfig);
      this.initialized = true;
    });
  }
}
