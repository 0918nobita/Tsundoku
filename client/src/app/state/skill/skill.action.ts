import { Action } from '@ngrx/store';

export enum SkillActionTypes {
  CreateSkill = '[Skill] Create',
  DeleteSkill = '[Skill] Delete'
}

class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
}

class DeleteSkill implements Action {
  readonly type = SkillActionTypes.DeleteSkill;
}
