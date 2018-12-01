import { Action } from '@ngrx/store';

import { initialBookshelfState } from '../_state.inits';
import { BookshelfState } from '../_state.interfaces';
import { BookshelfActionTypes, UpdateBookshelf } from './bookshelf.action';
import {
  updateDynamicList,
  sortByDatetime
} from '../../../app/services/firestore-utils';

export function reducer(
  state = initialBookshelfState,
  action: Action
): BookshelfState {
  switch (action.type) {
    case BookshelfActionTypes.WatchBookshelf:
      return state;

    case BookshelfActionTypes.UpdateBookshelf:
      const { book } = (action as UpdateBookshelf).payload;
      const books = state.books;
      updateDynamicList(books, book);
      sortByDatetime({ key: 'modified', objects: books }, 'desc');
      console.log(books);
      return Object.assign({}, { ...state, books });

    case BookshelfActionTypes.WatchBookshelfFail:
    case BookshelfActionTypes.RegisterManuallyAddedBook:
    case BookshelfActionTypes.RegisterResolvedBook:
    case BookshelfActionTypes.DeleteBookshelf:
    default:
      return state;
  }
}
