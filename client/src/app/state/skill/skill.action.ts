import { Action } from '@ngrx/store';

export enum SkillActionTypes {
  CreateSkill = '[Skill] Create',
  DeleteSkill = '[Skill] Delete',
  DeleteSkillSuccess = '[Skill] Succeed in deleting'
}

class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
}

class DeleteSkill implements Action {
  readonly type = SkillActionTypes.DeleteSkill;
}

// スキルの削除に成功した
export class DeleteSkillSuccess implements Action {
  readonly type = SkillActionTypes.DeleteSkillSuccess;
}
