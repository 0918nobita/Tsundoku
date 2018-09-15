import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-twistamp',
  templateUrl: './twistamp.component.html',
  styleUrls: ['./twistamp.component.css']
})
export class TwistampComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.color = 'black';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E2E9EE';
  }
}
