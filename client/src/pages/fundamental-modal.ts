import { ViewController, ToastController } from 'ionic-angular';

export class FundamentalModal {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showError(error) {
    this.toastCtrl
      .create({
        message: error,
        duration: 5000,
        position: 'top'
      })
      .present();
  }
}
