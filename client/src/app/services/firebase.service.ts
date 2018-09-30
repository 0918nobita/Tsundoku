import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import * as config from '../config.json';
import { concat, from, fromEvent, /*interval,*/ merge, Observable, of } from 'rxjs';
import { filter, map, mergeMap, pluck, skip, tap } from 'rxjs/operators';

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
    // of(1, 2, 3).subscribe(x => console.log('of: ' + x));

    // interval: 指定した時間ごとに値を流す
    // interval(1000).subscribe(console.log);

    // concat: Observable 同士を、ストリームの順序を保ったまま結合
    // concat(of(1, 2), of(3, 4)).subscribe(x => console.log('concat: ' + x));

    // tap: ストリームに影響を与えず、任意の処理を行う
    /*of(1 , 2, 3).pipe(
        tap(x => console.log('1st: ' + x)),
        tap(x => console.log('2nd: ' + (x * 2))),
        tap(x => console.log('3rd: ' + (x * 3)))
    ).subscribe(console.log);*/

    // map, pluck: ストリームの値を加工・変換・抽出する
    // 利用シーン: API のレスポンスを加工する
    /*const observable1 = of({ userId: 1, body: 'hoge' });
    observable1.pipe(map(x => x.userId)).subscribe(x => console.log('map: ' + x));
    observable1.pipe(pluck('userId')).subscribe(x => console.log('pluck: ' + x));*/

    // mergeMap: 引数を用いて新たな Observable を生成できる
    /*of('Hello').pipe(
        mergeMap(val => of(val + ', world!'))
    ).subscribe(x => console.log('mergeMap: ' + x));*/

    // Observable, observer を自作する
    /*Observable.create(observer => {
      try {
        observer.next(1);
        observer.next(2);

        // 50 % の確率で例外発生
        if (Math.random() < 0.5) throw new Error('エラー');

        observer.complete();
      } catch (err) {
        observer.error();
      }
    }).subscribe({
      next(x) { console.log('next: ' + x); },
      error() { console.log('error!'); },
      complete() { console.log('complete!'); }
    });*/

    // pipe に渡せるオペレータを自作する
    /*const square = (input: Observable<number>) =>
        Observable.create(observer => input.subscribe({
          next(x) { observer.next(x ** 2); },
          error(error) { observer.error(error); },
          complete() { observer.complete(); }
        }));*/

    /*from([1, 2, 3, 4])
        .pipe(square).subscribe(x => console.log('square: ' + x));*/

    // skip: 値のスキップ
    /*from([1, 2, 3, 4])
        .pipe(skip(2)).subscribe(x => console.log('skip: ' + x));*/

    /*from([1, 2, 3, 4])
        .pipe(filter(x => (x % 2 === 0)))
        .subscribe(x => console.log('filter: ' + x));*/
  }
}
