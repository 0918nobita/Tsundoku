import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

import * as config from '../config.json';

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
  }
}
