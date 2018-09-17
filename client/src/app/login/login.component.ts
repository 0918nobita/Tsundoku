import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { AccountService } from '../services/account.service';

/**
 * ログイン画面
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private accountService: AccountService) {
    this.accountService.auth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigate(['/bookshelf']);
      } else {
        $('#title').show();
        $('form').show();
      }
    });
  }

  ngOnInit() {}

  async login(email, password) {
    try {
      const result = await this.accountService.login(email, password);
      this.router.navigate(['/bookshelf']);
    } catch(error) {
      console.log(error);
    }
  }
}
