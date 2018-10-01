import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User | null = null;
  private functions: firebase.functions.Functions;
  private listeners: Array<(a: firebase.User, b: User) => any> = [];
  auth: firebase.auth.Auth;

  constructor(private router: Router,
              private firebaseService: FirebaseService) {
          await this.router.navigate(['/']);
  }

    }
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
          };
        } else {
          return null;
        }
      })
      .catch(error => {
        console.log(error);
        return null;
      });

  async login(email: string, password: string) {
    try {
      if (this.auth.currentUser) return;

      const result = await this.auth.signInWithEmailAndPassword(email, password);

      if (result == null || result.user == null) throw new Error();

      const hitUser = await this.getUserByUID(result.user.uid);

      if (hitUser !== null) {
        this.myself = hitUser;
        localStorage.setItem('myself', JSON.stringify(hitUser));
        return;
      }

      throw new Error();
    } catch (error) {
      console.error(error);
    }
  }

  get uid() { return this.myself && this.myself.uid; }

  get name() { return this.myself && this.myself.name; }

  get screenName() { return this.myself && this.myself.screenName; }

  get image() { return this.myself && this.myself.image; }

  get bio() { return this.myself && this.myself.bio; }
}
