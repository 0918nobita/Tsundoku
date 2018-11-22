import { Action } from '@ngrx/store';
import { ResolvedBook } from '../models/resolved-book';

/*
  本に関するアクション
  (*) ISBN で本を検索する
    --> ローカル DB で検索する
    --> ローカルDB で見つからなければ Google Books API で検索する
    --> サムネイルが見つからなければ Firestore の resolvedBooks コレクションを確認する
  (*) スキルで本を検索する
  */

export enum BookActionTypes {
  GetBook = '[Book] Get',
  GetBookSuccess = '[Book] Succeed in getting',
  GetBookFail = '[Book] Fail in getting',
  SearchByIsbnAction = '[Book] Search by ISBN',
  SearchByIsbnSuccess = '[Book] Succeed in searching by ISBN',
  SearchByIsbnFailed = '[Book] Fail in searching by ISBN',
  SearchBySkillAction = '[Book] Search by skill',
  SearchBySkillSuccess = '[Book] Succeed in searching by skill',
  SearchBySkillFailed = '[Book] Fail in searching by skill'
}

export class GetBook implements Action {
  readonly type = BookActionTypes.GetBook;
  constructor(public payload: { isbn: string }) {}
}

export class GetBookSuccess implements Action {
  readonly type = BookActionTypes.GetBookSuccess;
  constructor(public payload: { book: ResolvedBook }) {}
}

export class GetBookFail implements Action {
  readonly type = BookActionTypes.GetBookFail;
  constructor(public payload?: { error: any }) {}
}

export class SearchByIsbnAction implements Action {
  readonly type = BookActionTypes.SearchByIsbnAction;
  constructor(public payload: { isbn: string }) {}
}

export class SearchByIsbnSuccess implements Action {
  readonly type = BookActionTypes.SearchByIsbnSuccess;
}

export class SearchByIsbnFailed implements Action {
  readonly type = BookActionTypes.SearchByIsbnFailed;
  constructor(public payload: {}) {}
}

export class SearchBySkillAction implements Action {
  readonly type = BookActionTypes.SearchBySkillAction;
  constructor(public payload: { skillID: string }) {}
}

export class SearchBySkillSuccess implements Action {
  readonly type = BookActionTypes.SearchBySkillSuccess;
}

export class SearchBySkillFailed implements Action {
  readonly type = BookActionTypes.SearchBySkillFailed;
}
