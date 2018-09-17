import { Injectable } from '@angular/core';
import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User = null;
  private functions: firebase.functions.Functions;
  private listeners: Array<(a: firebase.User) => any> = [];
  auth: firebase.auth.Auth;

  constructor(private firebaseService: FirebaseService) {
    this.auth = this.firebaseService.auth;
    this.functions = this.firebaseService.functions;
    this.afterLogin(user => {
      if (user) this.myself = <User> JSON.parse(localStorage.getItem('myself'));
    });
    this.auth.onAuthStateChanged(this.onAuthStateChanged);
  }

  afterLogin(listener: (a: firebase.User) => any) {
    if (this.auth.currentUser) {
      listener(this.auth.currentUser);
      return;
    }
    this.listeners.push(listener);
  }

  private onAuthStateChanged = (user: firebase.User) => {
    for (let i = 0; i < this.listeners.length; i++) this.listeners[i](user);
  };

  private getUserByUID = (uid: string): Promise<User | null> =>
    this.functions.httpsCallable('getUsersByUID')(uid)
      .then(result => {
        const data = result.data;
        if (data.length > 0) {
          return {
            bio: data[0].bio,
            image: data[0].image,
            name: data[0].name,
            screenName: data[0].screenName,
            uid
          }
        } else {
          return null;
        }
      })
      .catch(error => {
        console.log(error);
        return null;
      });

  /*register = (email: string, password: string): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
      if (this.isLoggedIn() === true) reject();
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then(async result => {
          const hitUser = await this.getUserByUID(result.user.uid);
          if (hitUser !== null) {
            this.myself = hitUser;
            resolve(true);
          } else {
            // TODO: Firestore 側で uid でユーザーを検索してヒットしなかった場合の挙動を決める
          }
        })
        .catch(error => {
          console.log(error);
          reject(false);
        });
    });*/

  login = (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      if (this.auth.currentUser) resolve();
      await this.auth.signInWithEmailAndPassword(email, password)
        .then(async result => {
          const hitUser = await this.getUserByUID(result.user.uid);
          if (hitUser !== null) {
            this.myself = hitUser;
            localStorage.setItem('myself', JSON.stringify(hitUser));
            resolve();
          } else {
            // TODO: Firestore 側で uid でユーザーを検索してヒットしなかった場合の挙動を決める
          }
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });

  get uid() { return this.myself && this.myself.uid; }

  get name() { return this.myself && this.myself.name; }

  get screenName() { return this.myself && this.myself.screenName; }

  get image() { return this.myself && this.myself.image; }

  get bio() { return this.myself && this.myself.bio; }
}
