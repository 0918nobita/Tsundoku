import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FirebaseAuth, FirebaseFunctions } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

export enum AccountState {
  INITIAL, LOGGED_IN
}

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User | null = null;
  private auth: FirebaseAuth;
  private functions: FirebaseFunctions;
  private loginSubject = new BehaviorSubject<User | null>(null);
  login$ = this.loginSubject.asObservable();

  constructor(private router: Router,
              private firebaseService: FirebaseService,
              private userService: UserService,
              private afAuth: AngularFireAuth,
              private afFunctions: AngularFireFunctions) {
    this.auth = this.afAuth.auth;
    this.functions = this.afFunctions.functions;

    this.firebaseService.observable.subscribe(() => {
      this.auth.onAuthStateChanged(async user => {
        if (user) {
          const account = await this.userService.getUserByUID(user.uid);
          if (account == null) await this.router.navigate(['/']);

          this.myself = account;
          this.loginSubject.next(<User> account);
        } else if (['/', '/login', '/register'].indexOf(location.pathname) === -1) {
          await this.router.navigate(['/login']);
        }
      });
    });
  }

  async login(email: string, password: string): Promise<void> {
    if (this.auth.currentUser) return;

    const result = await this.auth.signInWithEmailAndPassword(email, password);

    if (result == null || result.user == null) throw new Error('ログインに失敗しました');

    const hitUser = await this.userService.getUserByUID(result.user.uid);

    if (hitUser === null) throw new Error('指定した UID に対応するユーザーが見つかりません');

    this.myself = hitUser;
    localStorage.setItem('myself', JSON.stringify(hitUser));
  }

  get uid() { return this.myself && this.myself.uid; }

  get name() { return this.myself && this.myself.name; }

  get screenName() { return this.myself && this.myself.screenName; }

  get image() { return this.myself && this.myself.image; }

  get bio() { return this.myself && this.myself.bio; }
}
