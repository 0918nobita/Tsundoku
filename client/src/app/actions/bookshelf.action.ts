import { Action } from '@ngrx/store';
import { RegisteredBook } from '../models/registered-book';
import { ManuallyAddedBook } from '../models/manually-added-book';

// Action の種類
export enum BookshelfActionTypes {
  CreateBook = '[Bookshelf] Create book',
  CreateBookSuccess = '[Bookshelf] Create book: Success',
  CreateBookFailed = '[Bookshelf] Create book: failed',
  SearchBookByIsbn = '[Bookshelf] Search book by ISBN',
  SearchBookBySkill = '[Bookshelf] Search book by skill',
  RegisterResolvedBook = '[Bookshelf] Register resolved book'
}

// 手動入力された本の情報を本棚に登録
export class CreateBook implements Action {
  readonly type = BookshelfActionTypes.CreateBook;

  constructor(public payload: ManuallyAddedBook) {}
}

// 登録成功
export class CreateBookSuccess implements Action {
  readonly type = BookshelfActionTypes.CreateBookSuccess;
}

// 登録失敗
export class CreateBookFailed implements Action {
  readonly type = BookshelfActionTypes.CreateBookFailed;
}

export class SearchBookByIsbn implements Action {
  readonly type = BookshelfActionTypes.SearchBookByIsbn;

  constructor(public payload: RegisteredBook) {}
}

export class SearchBookBySkill implements Action {
  readonly type = BookshelfActionTypes.SearchBookBySkill;

  constructor(public payload: RegisteredBook) {}
}

export class RegisterResolvedBook implements Action {
  readonly type = BookshelfActionTypes.RegisterResolvedBook;

  constructor(public payload: RegisteredBook) {}
}

export type BookshelfActions =
  | CreateBook
  | CreateBookSuccess
  | CreateBookFailed
  | SearchBookByIsbn
  | SearchBookBySkill
  | RegisterResolvedBook;
