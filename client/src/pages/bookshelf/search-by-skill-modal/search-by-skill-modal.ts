import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'search-by-skill-modal',
  templateUrl: 'search-by-skill-modal.html'
})
export class SearchBySkillModal extends FundamentalModal {
  skill: string;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController
  ) {
    super(viewCtrl, toastCtrl);
  }
}
