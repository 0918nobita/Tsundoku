import { Action } from '@ngrx/store';

import { State } from './_state.interfaces';
import { initialState } from './_state.inits';
import { BookActionTypes } from './book.action';

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case BookActionTypes.SearchByIsbnAction:
      return state;
    case BookActionTypes.SearchByIsbnSuccess:
      return state;
    case BookActionTypes.SearchByIsbnFailed:
      return state;
    case BookActionTypes.SearchBySkillAction:
      return state;
    case BookActionTypes.SearchBySkillSuccess:
      return state;
    case BookActionTypes.SearchBySkillFailed:
      return state;
  }
}
