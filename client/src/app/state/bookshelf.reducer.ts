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
      return state;
    case BookshelfActionTypes.RegisterResolvedBook:
      return state;
    case BookshelfActionTypes.DeleteBookshelf:
      return state;
  }
}
