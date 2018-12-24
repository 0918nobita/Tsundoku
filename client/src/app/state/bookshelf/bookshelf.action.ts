import { Action } from '@ngrx/store';
import { RegisteredBook } from '../../../app/models/registered-book';

export enum BookshelfActionTypes {
  WatchBookshelf = '[Bookshelf] Watch',
  UpdateBookshelf = '[Bookshelf] Update',
  WatchBookshelfFail = '[Bookshelf] Fail in reading',
  DeleteBookshelf = '[Bookshelf] Delete'
}

// 自分の本棚の情報を取得し始める
export class WatchBookshelf implements Action {
  readonly type = BookshelfActionTypes.WatchBookshelf;
}

// 本棚の情報を更新する (差分の本の情報を payload で指定する)
export class UpdateBookshelf implements Action {
  readonly type = BookshelfActionTypes.UpdateBookshelf;
  constructor(public payload: RegisteredBook[]) {}
}

export class WatchBookshelfFail implements Action {
  readonly type = BookshelfActionTypes.WatchBookshelfFail;
  constructor(public payload?: {}) {}
}

// 本棚の一括削除 (退会時)
export class DeleteBookshelf implements Action {
  readonly type = BookshelfActionTypes.DeleteBookshelf;
}
