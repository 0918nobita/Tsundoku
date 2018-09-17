import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css']
})
export class ProgressCardComponent implements OnInit {
  @Input() public created: string;
  @Input() public desc: string;
  @Input() public isbn: string;
  @Input() public userName: string;
  @Input() public range: string;

  constructor() {}
  ngOnInit() {}
}
