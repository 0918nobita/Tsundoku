import { Action } from '@ngrx/store';
import { RegisteredBook } from '../models/registered-book';

// Action の種類
export enum BookshelfActionTypes {
  CreateBook = '[Bookshelf] Create book',
  SearchBookByIsbn = '[Bookshelf] Search book by ISBN',
  SearchBookBySkill = '[Bookshelf] Search book by skill',
  RegisterResolvedBook = '[Bookshelf] Register resolved book'
}

export class CreateBook implements Action {
  readonly type = BookshelfActionTypes.CreateBook;

  constructor(public payload: RegisteredBook) {}
}

export class SearchBookByIsbn implements Action {
  readonly type = BookshelfActionTypes.SearchBookByIsbn;

  constructor(public payload: RegisteredBook) {}
}

export class SearchBookBySkill implements Action {
  readonly type = BookshelfActionTypes.SearchBookBySkill;

  constructor(public payload: RegisteredBook) {}
}
