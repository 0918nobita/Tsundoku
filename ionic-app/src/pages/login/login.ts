import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignUpPage } from '../signup/signup';
import { gitHubConfig } from '../../app/config';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController) {}

  userLogin() {
    location.href = `https://github.com/login/oauth/authorize?client_id=${
      gitHubConfig.clientId
    }&scope=repo`;
  }

  async gotoSignUp() {
    await this.navCtrl.push(SignUpPage);
  }
}
