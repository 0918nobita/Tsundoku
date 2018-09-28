import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import * as config from '../config.json';
import { concat, fromEvent, /*interval,*/ merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    of(1, 2, 3).subscribe(x => console.log('of: ' + x));

    // 指定した時間ごとに値を流す
    // interval(1000).subscribe(console.log);

    // Observable 同士を、ストリームの順序を保ったまま結合
    concat(of(1, 2), of(3, 4)).subscribe(x => console.log('concat: ' + x));

    of(1 , 2, 3).pipe(
        tap(x => console.log('1st: ' + x)),
        tap(x => console.log('2nd: ' + (x * 2))),
        tap(x => console.log('3rd: ' + (x * 3)))
    ).subscribe(console.log);
  }
}
