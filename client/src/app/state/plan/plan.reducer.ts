import { Action } from '@ngrx/store';

import { initialPlanState } from '../_state.inits';
import { PlanState } from '../_state.interfaces';
import {
  PlanActionTypes,
  ReloadPlan,
  WatchPlanFail,
  UpdatePlanFail
} from './plan.action';

export function reducer(state = initialPlanState, action: Action): PlanState {
  switch (action.type) {
    case PlanActionTypes.WatchPlan:
    case PlanActionTypes.CreatePlan:
    case PlanActionTypes.UpdatePlan:
    case PlanActionTypes.DeletePlan:
      return state;

    case PlanActionTypes.WatchPlanFail:
      const payload = (action as WatchPlanFail).payload;
      if (payload !== void 0) console.error(payload.error);
      return state;

    case PlanActionTypes.ReloadPlan:
      const plans = (action as ReloadPlan).payload;
      return Object.assign({}, { ...state, plans });

    case PlanActionTypes.UpdatePlanFail:
      console.error((action as UpdatePlanFail).error);
      return state;

    default:
      return state;
  }
}
