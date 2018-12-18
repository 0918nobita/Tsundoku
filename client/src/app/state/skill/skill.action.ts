import { Action } from '@ngrx/store';
import { Skill } from '../../models/skill';

export enum SkillActionTypes {
  WatchSkill = '[Skill] Watch',
  UpdateSkill = '[Skill] Update',
  WatchSkillFail = '[Skill] Fail in watching',
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

export class UpdateSkill implements Action {
  readonly type = SkillActionTypes.UpdateSkill;
  constructor(public payload: Skill[]) {}
}

export class WatchSkillFail implements Action {
  readonly type = SkillActionTypes.WatchSkillFail;
  constructor(public payload: any) {}
}

export class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
  constructor(public isbn: string, public content: string) {}
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
