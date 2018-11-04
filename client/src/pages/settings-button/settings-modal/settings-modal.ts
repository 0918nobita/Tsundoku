import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'settings-modal',
  templateUrl: 'settings-modal.html'
})
export class SettingsModal extends FundamentalModal {
  constructor(protected viewCtrl: ViewController) {
    super(viewCtrl);
  }
}
