import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { concatMap, catchError, mergeMap, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  AuthActionTypes,
  SignInFail,
  SignIn,
  SignInSuccess
} from './auth.action';
import { LocalDatabase } from '../../services/local-database';
import { AuthState, State } from '../_state.interfaces';
import { getUser } from '../_state.selectors';

@Injectable()
export class AuthEffects {
  signInSubject: BehaviorSubject<firebase.User | null | undefined>;

  constructor(
    private actions$: Actions,
    private localDB: LocalDatabase,
    private store: Store<State>
  ) {
    this.signInSubject = new BehaviorSubject(void 0);
    firebase.auth().onAuthStateChanged(this.signInSubject);
  }

  @Effect()
  signIn: Observable<Action> = this.actions$.pipe(
    ofType<SignIn>(AuthActionTypes.SignIn),
    concatMap(() =>
      this.signInSubject.pipe(
        mergeMap(async user => {
          if (!user) {
            await Promise.all([
              this.localDB.table('resolvedBooks').clear(),
              this.localDB.table('registeredBooks').clear()
            ]);
            return new SignInFail({ error: '自動サインインに失敗しました' });
          }

          return new SignInSuccess({ user });
        })
      )
    ),
    catchError(error => of(new SignInFail({ error })))
  );

  forAuthenticated = this.store.pipe(
    select(getUser),
    map(me => {
      if (me === null || me === void 0) {
        throw new Error('ユーザー情報の取得に失敗しました');
      }
      return me.uid;
    })
  );
}
