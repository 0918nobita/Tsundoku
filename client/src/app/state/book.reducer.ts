import { Action } from '@ngrx/store';

import { BookState } from './_state.interfaces';
import { initialBookState } from './_state.inits';
import { BookActionTypes } from './book.action';

export function reducer(state = initialBookState, action: Action): BookState {
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
