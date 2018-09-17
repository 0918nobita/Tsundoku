import { Component, OnInit } from '@angular/core';
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
  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  async login(email, password) {
    /*const result = await this.accountService.login(email, password);
    if (result === true) console.log(this.accountService.bio);*/
  }
}
