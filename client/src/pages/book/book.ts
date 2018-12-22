import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { BookDetailsModal } from '../book-details-modal/book-details-modal';
import { ResolvedBook } from '../../app/models/resolved-book';

@Component({
  selector: 'book-widget',
  templateUrl: 'book.html'
})
export class Book {
  @ViewChildren('thumbnail') thumbnail: QueryList<ElementRef>;
  @Input()
  book: ResolvedBook;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    const children = this.thumbnail.toArray();
    if (children.length > 0) {
      const ctx: CanvasRenderingContext2D = this.thumbnail.first.nativeElement.getContext(
        '2d'
      );
      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(0, 0, 128, 164);
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.font = 'bold 15px Arial, meiryo, sans-serif';
      const lines = this.book.title.match(/[\s\S]{1,8}/g) || [];
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 10, 10 + (i + 1) * 15);
      }
    }
  }

  showDetails() {
    this.modalCtrl.create(BookDetailsModal, { isbn: this.book.isbn }).present();
  }
}
