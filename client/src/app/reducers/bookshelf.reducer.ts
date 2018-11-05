import { RegisteredBook } from '../models/registered-book';
import {
  BookshelfActions,
  BookshelfActionTypes
} from '../actions/bookshelf.action';

export interface State {
  loading: boolean;
  books: RegisteredBook[];
}

export const initialState: State = {
  loading: false,
  books: []
};

// state: 現在の状態
// action: 発行された Action
export function reducer(state = initialState, action: BookshelfActions): State {
  switch (action.type) {
    case BookshelfActionTypes.CreateBook:
      return { ...state, loading: true };
    case BookshelfActionTypes.CreateBookSuccess:
      return { ...state, loading: false };
    case BookshelfActionTypes.CreateBookFailed:
      return { ...state, loading: false };
    case BookshelfActionTypes.SearchBookByIsbn:
      return { ...state, loading: true };
    case BookshelfActionTypes.SearchBookBySkill:
      return { ...state, loading: true };
    case BookshelfActionTypes.RegisterResolvedBook:
      const payload = action.payload;
      return { ...state, loading: true, books: [ ...state.books, payload ] };
  }
}

// セレクタ ( Store から特定の状態を取得する )
export const getLoading = (state: State) => state.loading;
export const getBooks = (state: State) => state.books;
