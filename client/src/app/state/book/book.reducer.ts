import { initialBookState } from '../_state.inits';
import { Action } from '@ngrx/store';
import { BookState } from '../_state.interfaces';
import { BookActionTypes } from './book.action';

export function reducer(state = initialBookState, action: Action): BookState {
  switch (action.type) {
    case BookActionTypes.LoadBookDetails:
    case BookActionTypes.LoadBookDetailsSuccess:
    case BookActionTypes.LoadBookDetailsFail:
    default:
      return state;
  }
}
