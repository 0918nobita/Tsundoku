import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'settings-modal',
  templateUrl: 'settings-modal.html'
})
export class SettingsModal {
  constructor(private viewCtrl: ViewController) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }
}
