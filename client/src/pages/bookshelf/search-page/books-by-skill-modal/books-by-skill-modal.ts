import { FundamentalModal } from '../../../../pages/fundamental-modal';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'books-by-skill-modal.html'
})
export class BooksBySkillModal extends FundamentalModal {
  isbn: string;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private navParams: NavParams
  ) {
    super(viewCtrl, toastCtrl);
    this.isbn = this.navParams.get('isbn');
  }

  ionViewWillEnter() {
    console.log(this.isbn);
  }
}
