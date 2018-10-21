import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-callback',
  templateUrl: 'callback.html'
})
export class CallbackPage {
  code: string = '';

  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    const params = {};
    location.search
      .substring(1)
      .split('&')
      .forEach(item => {
        const [key, value] = item.split('=');
        params[key] = value;
      });
    this.code = params['code'];
  }
}
