import { Action } from '@ngrx/store';

export enum SkillActionTypes {
  CreateSkill = '[Skill] Create',
  CreateSkillSuccess = '[Skill] Succeed in creating',
  DeleteSkill = '[Skill] Delete',
  DeleteSkillSuccess = '[Skill] Succeed in deleting'
}

class CreateSkill implements Action {
  readonly type = SkillActionTypes.CreateSkill;
}

// スキルの作成に成功した
export class CreateSkillSuccess implements Action {
  readonly type = SkillActionTypes.CreateSkillSuccess;
}

// スキルを削除する
export class DeleteSkill implements Action {
  readonly type = SkillActionTypes.DeleteSkill;
}

// スキルの削除に成功した
export class DeleteSkillSuccess implements Action {
  readonly type = SkillActionTypes.DeleteSkillSuccess;
}
