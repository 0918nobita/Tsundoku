import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'book-creation-modal',
  templateUrl: 'book-creation-modal.html'
})
export class BookCreationModal extends FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
