import { Component } from '@angular/core';

import { gitHubConfig } from '../../app/config';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor() {}

  userLogin() {
    location.href = `https://github.com/login/oauth/authorize?client_id=${
      gitHubConfig.clientId
    }&scope=repo`;
  }
}
