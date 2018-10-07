import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'shared/entity';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private accountService: AccountService
  ) {
    this.accountService.login$.subscribe(
      async (user: User | null): Promise<void> => {
        if (user == null) return;
        if (['/', '/login', '/register'].indexOf(location.pathname) !== -1)
          await this.router.navigate(['/bookshelf']);
      }
    );
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#EEEEEE';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#424242';
  }
}
