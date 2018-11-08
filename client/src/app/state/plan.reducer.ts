import { Action } from '@ngrx/store';

import { initialPlanState } from './_state.inits';
import { PlanState } from './_state.interfaces';
import { PlanActionTypes } from './plan.action';

export function reducer(state = initialPlanState, action: Action): PlanState {
  switch (action.type) {
    case PlanActionTypes.WatchPlan:
      return state;
    case PlanActionTypes.WatchPlanFail:
      return state;
    case PlanActionTypes.CreatePlan:
      return state;
    case PlanActionTypes.UpdatePlan:
      return state;
    case PlanActionTypes.DeletePlan:
      return state;
  }
}
