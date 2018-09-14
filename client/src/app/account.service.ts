import { Injectable } from '@angular/core';
import { User } from 'shared/entity';
import { FirebaseService } from './firebase.service';

/** 登録 / ログイン / ログアウト / 退会処理, ログイン中のアカウントの情報の保持 を担当する */
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private myself: User;
  private auth: firebase.auth.Auth;

  constructor(private firebaseService: FirebaseService) {
    this.auth = this.firebaseService.auth;
  }

  get uid() { return this.myself && this.myself.uid; }

  get name() { return this.myself && this.myself.name; }

  get screenName() { return this.myself && this.myself.screenName; }

  get image() { return this.myself && this.myself.image; }

  get bio() { return this.myself && this.myself.bio; }
}
