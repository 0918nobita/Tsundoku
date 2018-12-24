import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SettingsModal } from './settings-modal/settings-modal';

@Component({
  selector: 'settings-button',
  templateUrl: 'settings-button.html'
})
export class SettingsButton {
  constructor(private modalCtrl: ModalController) {}

  openModal() {
    this.modalCtrl.create(SettingsModal).present();
  }
}
