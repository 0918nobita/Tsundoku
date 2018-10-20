import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../signup/signup';

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
      const user = (await this.afAuth.auth.signInWithEmailAndPassword(
        this.login.email,
        this.login.password
      )).user;

      await Promise.all([
        this.toastCtrl
          .create({
            message: `${user.displayName} さん、お帰りなさい`,
            duration: 3000
          })
          .present(),
        this.navCtrl.setRoot(TabsPage)
      ]);
    } catch (error) {
      await this.toastCtrl
        .create({
          message: error,
          duration: 5000
        })
        .present();
    }
  }

  async gotoSignUp() {
    await this.navCtrl.push(SignUpPage);
  }
}
