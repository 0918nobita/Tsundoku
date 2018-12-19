import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController } from 'ionic-angular';
import { FundamentalModal } from '../../../../pages/fundamental-modal';

@Component({
  templateUrl: 'skill-control-modal.html'
})
export class SkillControlModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private navParams: NavParams
  ) {
    super(viewCtrl, toastCtrl);
  }
}
