import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})

export class BookModalComponent implements OnInit {
  @Input() public title: string;
  @Input() public author: string;
  @Input() public desc: string;
  @Input() public image: string;

  constructor() {}

  ngOnInit() {}
}
