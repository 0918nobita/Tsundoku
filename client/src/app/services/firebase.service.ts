import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import * as config from '../config.json';
import { fromEvent, interval, merge, of } from 'rxjs';

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
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.functions = firebase.functions();

    const observable = merge(
        fromEvent(window, 'online'),
        fromEvent(window, 'offline'));

    observable.subscribe((event) => {
      console.log('接続状態が変化しました', event);
    });

    // 指定した複数の値を Observable に変換する
    of(1, 2, 3).subscribe(console.log);

    // 指定した時間ごとに値を流す
    interval(1000).subscribe(console.log);
  }
}
