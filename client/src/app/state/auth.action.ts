import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SignIn = '[Auth] Sign In',
  SignInSuccess = '[Auth] Succeed',
  SignInFail = '[Auth] Fail'
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;
}

export class SignInSuccess implements Action {
  readonly type = AuthActionTypes.SignInSuccess;
  constructor(public payload: { user: firebase.User }) {}
}

export class SignInFail implements Action {
  readonly type = AuthActionTypes.SignInFail;
  constructor(public payload?: { error: any }) {}
}
