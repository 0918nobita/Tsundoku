import { Action } from '@ngrx/store';

import { BookState } from './_state.interfaces';
import { initialBookState } from './_state.inits';
import { BookActionTypes, GetBookSuccess } from './book.action';

export function reducer(state = initialBookState, action: Action): BookState {
  switch (action.type) {
    case BookActionTypes.GetBook:
      return Object.assign({}, { ...state, loading: true });

    case BookActionTypes.GetBookSuccess:
      return Object.assign(
        {},
        {
          ...state,
          bookDetail: (action as GetBookSuccess).payload.book,
          loading: false
        }
      );

    case BookActionTypes.GetBookFail:
      console.log(action);
      return Object.assign({}, { ...state, loading: false });

    case BookActionTypes.SearchByIsbnAction:
    case BookActionTypes.SearchByIsbnSuccess:
    case BookActionTypes.SearchByIsbnFailed:
    case BookActionTypes.SearchBySkillAction:
    case BookActionTypes.SearchBySkillSuccess:
    case BookActionTypes.SearchBySkillFailed:
    default:
      return state;
  }
}
