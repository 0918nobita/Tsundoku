import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ui: firebaseui.auth.AuthUI;

  constructor() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  public static getUIconfig = () => ({
    callbacks: {
      signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential) => {
        // const user = authResult.user;

        if (authResult.additionalUserInfo.isNewUser) {
          // Do initialization stuff here (ex. create profile)
          return false;
        }

        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    tosUrl: 'https://tsundoku.tech',
    privacyPolicyUrl: 'https://tsundoku.tech'
  });
}
