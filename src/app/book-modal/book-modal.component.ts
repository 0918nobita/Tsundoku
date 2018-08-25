import { Component, OnInit, Input } from '@angular/core';

declare var $;

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})

export class BookModalComponent implements OnInit {
  @Input() public title: string;
  @Input() public author: string;
  @Input() public desc: string;
  @Input() public isbn: string;
  @Input() public image: string;

  visible = false;

  constructor() {}

  ngOnInit() {}

  show() {
    if (this.visible === false) {
      $('#filter').show();
      $('#details').show();
      this.visible = true;
    }
  }

  close() {
    $('#details').hide();
    $('#filter').hide();
    this.visible = false;
  }
}
