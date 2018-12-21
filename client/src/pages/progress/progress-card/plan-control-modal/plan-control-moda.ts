import { Component } from '@angular/core';
import { FundamentalModal } from '../../../../pages/fundamental-modal';
import { ViewController, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'plan-control-modal.html'
})
export class PlanControlModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
