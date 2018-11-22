import { Action } from '@ngrx/store';

import { initialBookshelfState } from './_state.inits';
import { BookshelfState } from './_state.interfaces';
import { BookshelfActionTypes } from './bookshelf.action';

export function reducer(
  state = initialBookshelfState,
  action: Action
): BookshelfState {
  switch (action.type) {
    case BookshelfActionTypes.RegisterManuallyAddedBook:
    case BookshelfActionTypes.RegisterResolvedBook:
    case BookshelfActionTypes.DeleteBookshelf:
    default:
      return state;
  }
}
