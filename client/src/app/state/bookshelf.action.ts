import { Action } from '@ngrx/store';

/*
  本棚に関するアクション
  - 本棚に手動入力の本を追加する
  - 本棚に解決済みの本を追加する
  - 本棚の一括削除 (退会時)
  */

export enum BookshelfActionTypes {
  RegisterManuallyAddedBook = '[Bookshelf] Register manually added book',
  RegisterResolvedBook = '[Bookshelf] Register resolved book',
  DeleteBookshelf = '[Bookshelf] Delete'
}

export class RegisterManuallyAddedBook implements Action {
  readonly type = BookshelfActionTypes.RegisterManuallyAddedBook;
}

export class RegisterResolvedBook implements Action {
  readonly type = BookshelfActionTypes.RegisterResolvedBook;
}

export class DeleteBookshelf implements Action {
  readonly type = BookshelfActionTypes.DeleteBookshelf;
}
