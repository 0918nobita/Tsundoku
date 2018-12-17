import { Action } from '@ngrx/store';
import { Skill } from '../../models/skill';

export enum SkillActionTypes {
  WatchSkill = '[Skill] Watch',
  CreateSkill = '[Skill] Create',
  CreateSkillSuccess = '[Skill] Succeed in creating',
  CreateSkillFail = '[Skill] Fail in creating',
  DeleteSkill = '[Skill] Delete',
  DeleteSkillSuccess = '[Skill] Succeed in deleting',
  DeleteSkillFail = '[Skill] Fail in deleting'
}

export class WatchSkill implements Action {
  readonly type = SkillActionTypes.WatchSkill;
}

export class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
  constructor(public payload: { skill: Skill }) {}
}

export class CreateSkillSuccess implements Action {
  readonly type = SkillActionTypes.CreateSkillSuccess;
}

export class CreateSkillFail implements Action {
  readonly type = SkillActionTypes.CreateSkillFail;
}

export class DeleteSkill implements Action {
  readonly type = SkillActionTypes.DeleteSkill;
  constructor(public payload: { id: string }) {}
}

export class DeleteSkillSuccess implements Action {
  readonly type = SkillActionTypes.DeleteSkillSuccess;
}

export class DeleteSkillFail implements Action {
  readonly type = SkillActionTypes.DeleteSkillFail;
}
