import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { OAuthCredential } from '@firebase/auth-types';

// import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../signup/signup';
import { gitHubConfig } from '../../app/config';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth
  ) {}

  async userLogin() {
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      provider.setCustomParameters({
        "client_id": gitHubConfig.clientId
      });
      const { user, credential }: { user: firebase.User, credential: OAuthCredential } =
        await this.afAuth.auth.signInWithPopup(provider);
      console.log('user: ', user);
      console.log('credential: ', credential);
    } catch (error) {
      await this.toastCtrl
        .create({
          message: error,
          duration: 5000
        }).present();
    }
  }

  async gotoSignUp() {
    await this.navCtrl.push(SignUpPage);
  }
}
