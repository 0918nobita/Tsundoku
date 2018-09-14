import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

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
}
