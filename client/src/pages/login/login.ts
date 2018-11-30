import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

import { SplitPane } from '../split-pane/split-pane';
import { State } from '../../app/state/_state.interfaces';
import { SignIn } from '../../app/state/auth/auth.action';
import { getUser } from '../../app/state/_state.selectors';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user$: Observable<firebase.User | null | undefined>;
  ui: firebaseui.auth.AuthUI;

  private loader: Loading;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private store: Store<State>
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'サインイン中…'
    });
    this.user$ = this.store.pipe(select(getUser));

    this.store.dispatch(new SignIn());
    this.loader.present();

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    this.user$.subscribe(async user => {
      if (user !== null && user !== void 0) {
        await this.navCtrl.setRoot(SplitPane);
        this.loader.dismiss();
        return;
      }

      this.loader.dismiss();
      this.showFirebaseUI();
    });
  }

  showFirebaseUI() {
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
