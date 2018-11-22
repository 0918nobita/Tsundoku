import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BookDetailsModal } from '../book-details-modal/book-details-modal';
import { ResolvedBook } from 'shared/entity';

@Component({
  selector: 'book-widget',
  templateUrl: 'book.html'
})
export class Book {
  @Input()
  book: ResolvedBook;

  constructor(private modalCtrl: ModalController) {}

  async showDetails() {
    await this.modalCtrl
      .create(BookDetailsModal, { isbn: this.book.isbn })
      .present();
  }
}
