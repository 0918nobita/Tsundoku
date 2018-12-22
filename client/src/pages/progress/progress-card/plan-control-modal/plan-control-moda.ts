import { Component } from '@angular/core';
import { FundamentalModal } from '../../../../pages/fundamental-modal';
import { ViewController, ToastController, NavParams } from 'ionic-angular';
import { Plan } from '../../../../app/models/plan';

@Component({
  templateUrl: 'plan-control-modal.html'
})
export class PlanControlModal extends FundamentalModal {
  plan: Plan;
  pageCount: string;
  validTitle = true;
  valid = true;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private navParams: NavParams
  ) {
    super(viewCtrl, toastCtrl);
    this.plan = this.navParams.get('plan');
  }

  validateTitle(text: string) {
    this.validTitle = text !== '';
  }

  validate(text: string) {
    const converted = parseInt(text, 10);
    this.valid =
      !isNaN(converted) &&
      converted >= 0 &&
      converted <= this.plan.book.pageCount;
  }

  store() {
    if (this.valid === false) return;
    let count = parseInt(this.pageCount, 10);
    if (count < 0) count = 0;
    if (count > this.plan.book.pageCount) {
      count = this.plan.book.pageCount;
    }
    this.dismiss();
  }
}
