import { FundamentalModal } from '../../../pages/fundamental-modal';
import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';

@Component({
  selector: 'search-modal',
  templateUrl: 'search-modal.html'
})
export class SearchModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
