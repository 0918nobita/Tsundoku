import { Action } from '@ngrx/store';

import { initialState } from './_state.inits';
import { State } from './_state.interfaces';
import { BookshelfActionTypes } from './bookshelf.action';

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case BookshelfActionTypes.RegisterManuallyAddedBook:
      return state;
    case BookshelfActionTypes.RegisterResolvedBook:
      return state;
    case BookshelfActionTypes.DeleteBookshelf:
      return state;
  }
}
