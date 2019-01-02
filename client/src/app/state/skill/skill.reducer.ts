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
      return state;

    case SkillActionTypes.CreateSkill:
      return Object.assign({}, state, { progress: 'adding' });

    case SkillActionTypes.DeleteSkill:
      return Object.assign({}, state, { progress: 'deleting' });

    case SkillActionTypes.CreateSkillSuccess:
    case SkillActionTypes.CreateSkillFail:
    case SkillActionTypes.DeleteSkillSuccess:
    case SkillActionTypes.DeleteSkillFail:
      return Object.assign({}, state, { progress: 'complete' });

    default:
      return state;
  }
}
