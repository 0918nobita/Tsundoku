import { Component } from '@angular/core';

import { AuthService } from "../../app/services/auth.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    private authService: AuthService
  ) {}

  ionViewDidLoad() {
    this.authService.ui.start('#firebaseui-auth-container', AuthService.getUIconfig());
  }
}
