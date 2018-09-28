import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import * as config from '../config.json';
import { concat, fromEvent, /*interval,*/ merge, of } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

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

    // of: 指定した複数の値を Observable に変換する
    of(1, 2, 3).subscribe(x => console.log('of: ' + x));

    // interval: 指定した時間ごとに値を流す
    // interval(1000).subscribe(console.log);

    // concat: Observable 同士を、ストリームの順序を保ったまま結合
    concat(of(1, 2), of(3, 4)).subscribe(x => console.log('concat: ' + x));

    // tap: ストリームに影響を与えず、任意の処理を行う
    of(1 , 2, 3).pipe(
        tap(x => console.log('1st: ' + x)),
        tap(x => console.log('2nd: ' + (x * 2))),
        tap(x => console.log('3rd: ' + (x * 3)))
    ).subscribe(console.log);

    // map, pluck: ストリームの値を加工・変換・抽出する
    // 利用シーン: API のレスポンスを加工する
    const observable1 = of({ userId: 1, body: 'hoge' });
    observable1.pipe(map(x => x.userId)).subscribe(x => console.log('map: ' + x));
    observable1.pipe(pluck('userId')).subscribe(x => console.log('pluck: ' + x));
  }
}
