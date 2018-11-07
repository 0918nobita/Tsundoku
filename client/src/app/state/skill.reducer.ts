import { Action } from "@ngrx/store";

import { initialState } from "./_state.inits";
import { State } from "./_state.interfaces";
import { SkillActionTypes } from "./skill.action";

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case SkillActionTypes.CreateSkill:
      return state;
    case SkillActionTypes.DeleteSkill:
      return state;
  }
}
