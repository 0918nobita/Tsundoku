import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import axios from 'axios';

@Component({
  selector: 'page-callback',
  templateUrl: 'callback.html'
})
export class CallbackPage {
  code: string = '';

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private afFunctions: AngularFireFunctions
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
        const result = (await this.afFunctions.functions.httpsCallable(
          'getGitHubAccessToken'
        )(params['code'])).data;
        console.log(
          await axios
            .create({
              headers: { Authorization: `token ${result}` }
            })
            .get('https://api.github.com/user')
        );
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
