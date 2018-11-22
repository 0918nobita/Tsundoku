import { Component } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  ui: firebaseui.auth.AuthUI;

  constructor() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  ionViewDidLoad() {
    this.ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: (
          authResult: firebase.auth.UserCredential
        ) => {
          // const user = authResult.user;

          if (
            (authResult.additionalUserInfo as firebase.auth.AdditionalUserInfo)
              .isNewUser
          ) {
            // Do initialization stuff here (ex. create profile)
            return false;
          }

          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
      tosUrl: 'https://tsundoku.tech',
      privacyPolicyUrl: 'https://tsundoku.tech'
    });
  }
}
