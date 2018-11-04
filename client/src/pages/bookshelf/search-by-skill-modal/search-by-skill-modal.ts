import { Component } from '@angular/core';
import { ToastController, ViewController } from 'ionic-angular';

@Component({
  selector: 'search-by-skill-modal',
  templateUrl: 'search-by-skill-modal.html'
})
export class SearchBySkillModal {
  skill: string;

  constructor(
    private toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }

  async search() {
  }
}
