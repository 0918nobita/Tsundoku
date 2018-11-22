import { ViewController, ToastController } from 'ionic-angular';

export class FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }

  async showError(error) {
    await this.toastCtrl
      .create({
        message: error,
        duration: 5000,
        position: 'top'
      })
      .present();
  }
}
