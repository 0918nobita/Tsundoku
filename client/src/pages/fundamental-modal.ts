import { ViewController } from 'ionic-angular';

export class FundamentalModal {
  constructor(protected viewCtrl: ViewController) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }
}
