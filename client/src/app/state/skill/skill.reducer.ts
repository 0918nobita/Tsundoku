import { Action } from '@ngrx/store';

import { initialSkillState } from '../_state.inits';
import { SkillState } from '../_state.interfaces';
import { SkillActionTypes, UpdateSkill } from './skill.action';
import { sortByDatetime } from '../../../app/services/firestore-utils';

export function reducer(state = initialSkillState, action: Action): SkillState {
  switch (action.type) {
    case SkillActionTypes.WatchSkill:
      return state;

    case SkillActionTypes.UpdateSkill:
      const skills = (action as UpdateSkill).payload;
      sortByDatetime({ key: 'created', objects: skills }, 'desc');
      return Object.assign({}, { ...state, skills });

    case SkillActionTypes.WatchSkillFail:
    case SkillActionTypes.CreateSkill:
    case SkillActionTypes.CreateSkillSuccess:
    case SkillActionTypes.CreateSkillFail:
    case SkillActionTypes.DeleteSkill:
    case SkillActionTypes.DeleteSkillSuccess:
    case SkillActionTypes.DeleteSkillFail:
    default:
      return state;
  }
}
