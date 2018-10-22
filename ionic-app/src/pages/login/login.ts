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
      const result = (await this.afFunctions.functions.httpsCallable(
        'getGitHubAuthorizationURL'
      )()).data;
      console.log(result);
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
