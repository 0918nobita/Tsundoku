import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import axios from 'axios';

import { gitHubConfig } from '../../app/config';

@Component({
  selector: 'page-callback',
  templateUrl: 'callback.html'
})
export class CallbackPage {
  code: string = '';

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async ionViewWillEnter() {
    const params = {};
    location.search
      .substring(1)
      .split('&')
      .forEach(item => {
        const [key, value] = item.split('=');
        params[key] = value;
      });
    this.code = params['code'];
    if (params['code'] !== void 0) {
      try {
        const result = (await axios.post(
          'https://github.com/login/oauth/access_token',
          {
            code: params['code'],
            client_id: gitHubConfig.clientId,
            client_secret: gitHubConfig.clientSecret
          }
        )).data;
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
}
