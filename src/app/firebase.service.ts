import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { config } from './config';

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
    this.functions = firebase.functions();;
  }
}
