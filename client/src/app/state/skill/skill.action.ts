import { Action } from '@ngrx/store';
import { Skill } from '../../models/skill';

export enum SkillActionTypes {
  CreateSkill = '[Skill] Create',
  CreateSkillSuccess = '[Skill] Succeed in creating',
  CreateSkillFail = '[Skill] Fail in creating',
  DeleteSkill = '[Skill] Delete',
  DeleteSkillSuccess = '[Skill] Succeed in deleting'
}

// スキルを作成する
export class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
  constructor(public payload: { skill: Skill }) {}
}

// スキルの作成に成功した
export class CreateSkillSuccess implements Action {
  readonly type = SkillActionTypes.CreateSkillSuccess;
}

// スキルの作成に成功した
export class CreateSkillFail implements Action {
  readonly type = SkillActionTypes.CreateSkillFail;
}

// スキルを削除する
export class DeleteSkill implements Action {
  readonly type = SkillActionTypes.DeleteSkill;
}

// スキルの削除に成功した
export class DeleteSkillSuccess implements Action {
  readonly type = SkillActionTypes.DeleteSkillSuccess;
}
