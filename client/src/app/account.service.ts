import { Injectable } from '@angular/core';
import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User;
  private myself: User = null;
  private auth: firebase.auth.Auth;
  private userCredential: firebase.auth.UserCredential;

  constructor(private firebaseService: FirebaseService) {
    this.auth = this.firebaseService.auth;
  }

  register = (email: string, password: string): Promise<void> =>
    new Promise(async (resolve, reject) => {
      if (this.myself !== null) reject();
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.userCredential = result;
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
    });

  login = (email: string, password: string) =>
    new Promise(async (resolve, reject) => {
      if (this.myself !== null) reject();
      await this.auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          this.userCredential = result;
          resolve();
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
