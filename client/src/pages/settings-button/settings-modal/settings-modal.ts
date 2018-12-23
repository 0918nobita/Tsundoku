import { Component } from '@angular/core';
import {
  ViewController,
  ToastController,
  AlertController
} from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';
import { State } from '../../../app/state/_state.interfaces';
import { Store } from '@ngrx/store';
import { SignOut } from '../../../app/state/auth/auth.action';

@Component({
  templateUrl: 'settings-modal.html'
})
export class SettingsModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private store: Store<State>
  ) {
    super(viewCtrl, toastCtrl);
  }
  withdraw() {
    this.alertCtrl
      .create({
        title: '本当に退会しますか？',
        message: 'この操作はやり直せません。',
        buttons: [
          {
            text: '退会する',
            handler: () => {
              console.log('退会処理');
            }
          },
          {
            text: 'キャンセル',
            role: 'cancel'
          }
        ]
      })
      .present();
  }
}
