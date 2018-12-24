import { Action } from '@ngrx/store';

import { initialBookshelfState } from '../_state.inits';
import { BookshelfState } from '../_state.interfaces';
import { BookshelfActionTypes, UpdateBookshelf } from './bookshelf.action';
import { sortByDatetime } from '../../../app/services/firestore-utils';

export function reducer(
  state = initialBookshelfState,
  action: Action
): BookshelfState {
  switch (action.type) {
    case BookshelfActionTypes.WatchBookshelf:
      return state;

    case BookshelfActionTypes.UpdateBookshelf:
      const books = (action as UpdateBookshelf).payload;
      sortByDatetime({ key: 'modified', objects: books }, 'desc');
      return Object.assign({}, { ...state, books });

    case BookshelfActionTypes.WatchBookshelfFail:
    case BookshelfActionTypes.DeleteBookshelf:
    default:
      return state;
  }
}
