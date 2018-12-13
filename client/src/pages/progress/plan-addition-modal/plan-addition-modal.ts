import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'plan-addition-modal',
  templateUrl: 'plan-addition-modal.html'
})
export class PlanAdditionModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
