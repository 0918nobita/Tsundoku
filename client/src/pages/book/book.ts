import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  ChangeDetectorRef
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
  thumbnailURL;

  constructor(
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    const children = this.thumbnail.toArray();
    if (children.length > 0) {
      const canvas = this.thumbnail.first.nativeElement;
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(0, 0, 128, 164);
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.font = 'bold 15px Arial, meiryo, sans-serif';
      const lines = this.book.title.match(/[\s\S]{1,8}/g) || [];
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 10, 10 + (i + 1) * 15);
      }
      this.thumbnailURL = canvas.toDataURL();
      this.cdRef.detectChanges();
    }
  }

  showDetails() {
    this.modalCtrl
      .create(BookDetailsModal, {
        isbn: this.book.isbn,
        image: this.book.image !== 'none' ? this.book.image : this.thumbnailURL
      })
      .present();
  }
}
