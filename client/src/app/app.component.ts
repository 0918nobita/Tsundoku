import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  constructor(private router: Router,
              private elementRef: ElementRef,
              private accountService: AccountService) {
    /*this.accountService.afterLogin(() => {
      if (['/', '/login', '/register'].indexOf(location.pathname) !== -1)
        this.router.navigate(['/bookshelf']);
      $('#routerOutlet').show();
    });*/
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#EEEEEE';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#424242';
  }
}
