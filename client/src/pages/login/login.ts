import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
  templateUrl: 'login.html'
})
export class LoginPage {
  user$: Observable<firebase.User | null | undefined>;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private store: Store<State>
  ) {
    const loader = this.loadingCtrl.create({
      content: 'サインイン中…'
    });
    this.user$ = this.store.pipe(select(getUser));

    this.store.dispatch(new SignIn());
    loader.present();

    this.user$.subscribe(async user => {
      if (user !== null && user !== void 0) {
        await this.navCtrl.setRoot(SplitPane);
        loader.dismiss();
        return;
      }

      loader.dismiss();
      this.showFirebaseUI();
    });
  }

  showFirebaseUI() {
    new firebaseui.auth.AuthUI(firebase.auth()).start(
      '#firebaseui-auth-container',
      {
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
        signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID]
      }
    );
  }
}
