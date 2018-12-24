import { Component } from '@angular/core';
import { FundamentalModal } from '../../../../pages/fundamental-modal';
import {
  ViewController,
  ToastController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import { Plan } from '../../../../app/models/plan';
import { AngularFireFunctions } from '@angular/fire/functions';
import { pickOnce } from '../../../../app/state/book/book.effect';

@Component({
  templateUrl: 'plan-control-modal.html'
})
export class PlanControlModal extends FundamentalModal {
  plan: Plan;
  title: string;
  desc: string;
  pageCount: string;
  validTitle = true;
  valid = true;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private navParams: NavParams,
    private afFunctions: AngularFireFunctions,
    private loadingCtrl: LoadingController
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

  async update() {
    if (this.valid === false) return;
    let count = parseInt(this.pageCount, 10);
    if (count < 0) count = 0;
    if (count > this.plan.book.pageCount) {
      count = this.plan.book.pageCount;
    }
    const loader = this.loadingCtrl.create({
      content: '更新処理中です…'
    });
    try {
      loader.present();
      const newPlan = {
        uid: this.plan.uid,
        isbn: this.plan.isbn,
        title: this.title,
        desc: this.desc,
        progress: count
      };
      await pickOnce(this.afFunctions.httpsCallable('updatePlan')(newPlan));
    } catch (e) {
      this.showError(e);
    } finally {
      loader.dismiss();
      this.dismiss();
    }
  }
}
