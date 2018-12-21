import { ViewController, ToastController } from 'ionic-angular';
import { FixAlertController } from './fix-alert-controller';

export class FundamentalModal extends FixAlertController {
  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super();
  }

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
