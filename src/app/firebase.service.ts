import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import * as config from './config.json';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  /**
   * FirebaseService を DI したコンポーネントで参照されるプロパティ
   * @type {firebase.functions.Functions}
   * @memberof FirebaseService
   */
  public functions: firebase.functions.Functions;

  constructor() {
    firebase.initializeApp(config);
    this.functions = firebase.functions();
  }
}
