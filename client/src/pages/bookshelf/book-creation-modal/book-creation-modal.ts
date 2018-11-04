import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FundamentalModal } from '../../fundamental-modal';

@Component({
  selector: 'book-creation-modal',
  templateUrl: 'book-creation-modal.html'
})
export class BookCreationModal extends FundamentalModal {
  constructor(protected viewCtrl: ViewController) {
    super(viewCtrl);
  }
}
