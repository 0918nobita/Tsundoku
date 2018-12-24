import { Action } from '@ngrx/store';
import { ResolvedBook } from '../../models/resolved-book';
import { RegisteredBook } from '../../models/registered-book';

export enum BookActionTypes {
  LoadBookDetails = '[Book] Load',
  LoadBookDetailsSuccess = '[Book] Succeed in loading',
  LoadBookDetailsFail = '[Book] Fail in loading'
}

export class LoadBookDetails implements Action {
  readonly type = BookActionTypes.LoadBookDetails;
  constructor(public isbn: string) {}
}

export class LoadBookDetailsSuccess implements Action {
  readonly type = BookActionTypes.LoadBookDetailsSuccess;
  constructor(public payload: ResolvedBook | RegisteredBook) {}
}

export class LoadBookDetailsFail implements Action {
  readonly type = BookActionTypes.LoadBookDetailsFail;
  constructor(public payload: any) {}
}
