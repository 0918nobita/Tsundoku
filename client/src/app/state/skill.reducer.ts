import { Action } from '@ngrx/store';

import { initialSkillState } from './_state.inits';
import { SkillState } from './_state.interfaces';
import { SkillActionTypes } from './skill.action';

export function reducer(state = initialSkillState, action: Action): SkillState {
  switch (action.type) {
    case SkillActionTypes.CreateSkill:
      return state;
    case SkillActionTypes.DeleteSkill:
      return state;
  }
}
