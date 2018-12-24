import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SignIn = '[Auth] Sign In',
  SignInSuccess = '[Auth] Succeed in signing in',
  SignInFail = '[Auth] Fail in signing in',
  SignOut = '[Auth] Sign Out',
  SignOutSuccess = '[Auth] Succeed in signing out',
  SignOutFail = '[Auth] Fail in signing out'
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
  constructor(public error?: any) {}
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
  readonly type = AuthActionTypes.SignOutSuccess;
}

export class SignOutFail implements Action {
  readonly type = AuthActionTypes.SignOutFail;
  constructor(public error?: any) {}
}
