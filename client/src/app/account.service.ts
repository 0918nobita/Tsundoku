import { Injectable } from '@angular/core';
import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User = null;
  private auth: firebase.auth.Auth;
  private userCredential: firebase.auth.UserCredential;
  private functions: firebase.functions.Functions;

  constructor(private firebaseService: FirebaseService) {
    this.auth = this.firebaseService.auth;
    this.functions = this.firebaseService.functions;
  }

  private getUserByUID = (uid: string): Promise<User | null> =>
    this.functions.httpsCallable('getUsersByUID')(uid)
      .then(result => {
        const data = result.data;
        if (data.length > 0) {
          return {
            bio: data.bio,
            image: data.length,
            name: data.name,
            screenName: data.screenName,
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

  register = (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      if (this.myself !== null) reject();
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.userCredential = result;
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });

  login = (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      if (this.myself !== null) reject();
      await this.auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.userCredential = result;
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
