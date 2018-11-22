import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'settings-modal',
  templateUrl: 'settings-modal.html'
})
export class SettingsModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
