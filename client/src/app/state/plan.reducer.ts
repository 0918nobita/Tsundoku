import { Action } from '@ngrx/store';

import { initialState } from './_state.inits';
import { State } from './_state.interfaces';
import { PlanActionTypes } from './plan.action';

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case PlanActionTypes.CreatePlan:
      return state;
    case PlanActionTypes.UpdatePlan:
      return state;
    case PlanActionTypes.DeletePlan:
      return state;
  }
}
