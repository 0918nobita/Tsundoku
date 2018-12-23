import { Action } from '@ngrx/store';

import { AuthState } from '../_state.interfaces';
import { initialAuthState } from '../_state.inits';
import { AuthActionTypes, SignInSuccess } from './auth.action';

export function reducer(state = initialAuthState, action: Action): AuthState {
  switch (action.type) {
    case AuthActionTypes.SignInSuccess:
      const user = (action as SignInSuccess).payload.user;
      return Object.assign({}, { ...state, user });

    case AuthActionTypes.SignOutSuccess:
      return Object.assign({}, { ...state, user: null });

    case AuthActionTypes.SignIn:
    case AuthActionTypes.SignInFail:
    case AuthActionTypes.SignOutFail:
    default:
      return state;
  }
}
