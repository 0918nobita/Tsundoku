import { Action } from '@ngrx/store';
import { RegisteredBook } from '../../../app/models/registered-book';

export enum BookshelfActionTypes {
  WatchBookshelf = '[Bookshelf] Watch',
  UpdateBookshelf = '[Bookshelf] Update',
  WatchBookshelfFail = '[Bookshelf] Fail in reading',
  RegisterManuallyAddedBook = '[Bookshelf] Register manually added book',
  RegisterResolvedBook = '[Bookshelf] Register resolved book',
  DeleteBookshelf = '[Bookshelf] Delete'
}

// 自分の本棚の情報を取得し始める
export class WatchBookshelf implements Action {
  readonly type = BookshelfActionTypes.WatchBookshelf;
}

// 本棚の情報を更新する (差分の本の情報を payload で指定する)
export class UpdateBookshelf implements Action {
  readonly type = BookshelfActionTypes.UpdateBookshelf;
  constructor(public payload: { book: RegisteredBook }) {}
}

export class WatchBookshelfFail implements Action {
  readonly type = BookshelfActionTypes.WatchBookshelfFail;
  constructor(public payload?: {}) {}
}

// 手動で本を本棚に追加する
export class RegisterManuallyAddedBook implements Action {
  readonly type = BookshelfActionTypes.RegisterManuallyAddedBook;
}

// 解決済みの本を本棚に追加する
export class RegisterResolvedBook implements Action {
  readonly type = BookshelfActionTypes.RegisterResolvedBook;
}

// 本棚の一括削除 (退会時)
export class DeleteBookshelf implements Action {
  readonly type = BookshelfActionTypes.DeleteBookshelf;
}
