import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import axios from 'axios';

@Component({
  selector: 'page-callback',
  templateUrl: 'callback.html'
})
export class CallbackPage {
  userName: string = '';

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

    if (params['code'] !== void 0) {
      try {
        const result = (await this.afFunctions.functions.httpsCallable(
          'getGitHubAccessToken'
        )(params['code'])).data;

        const { id, name } = (await axios.get('https://api.github.com/user', {
          headers: { Authorization: `token ${result}` }
        })).data;

        this.userName = `${name} (${id})`;
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
