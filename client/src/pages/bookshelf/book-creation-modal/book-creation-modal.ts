import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'book-creation-modal',
  templateUrl: 'book-creation-modal.html'
})
export class BookCreationModal {
  constructor(private viewCtrl: ViewController) {}

  async dismiss() {
    await this.viewCtrl.dismiss();
  }
}
