import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() public title: string;
  @Input() public author: string;
  @Input() public desc: string;
  @Input() public isbn: string;
  @Input() public image: string;

  constructor() {}
  ngOnInit() {}
}
