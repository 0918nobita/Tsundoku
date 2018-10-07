import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  email: string;
  password: string;

  constructor(private router: Router,
              private accountService: AccountService) {}

  ngOnInit() {}

  async login(email, password) {
    try {
      await this.accountService.login(email, password);
      await this.router.navigate(['/bookshelf']);
    } catch (error) {
      console.error(error);
    }
  }
}
