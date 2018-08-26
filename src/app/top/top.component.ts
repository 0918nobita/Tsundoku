import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})

export class TopComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  search() {
    this.router.navigate(['/search']);
  }
}
