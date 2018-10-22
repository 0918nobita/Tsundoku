import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    private afFunctions: AngularFireFunctions,
    private toastCtrl: ToastController
  ) {}

  async userLogin() {
    try {
      location.href = (await this.afFunctions.functions.httpsCallable(
        'getGitHubAuthorizationURL'
      )()).data;
    } catch (error) {
      await this.toastCtrl
        .create({
          message: error,
          duration: 5000
        })
        .present();
    }
  }
}
