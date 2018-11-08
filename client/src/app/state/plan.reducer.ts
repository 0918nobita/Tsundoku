import { Action } from '@ngrx/store';

import { initialPlanState } from './_state.inits';
import { PlanState } from './_state.interfaces';
import { PlanActionTypes, UpdatePlan } from './plan.action';
import { updateDynamicList, sortByDatetime } from '../services/firestore.service';

export function reducer(state = initialPlanState, action: Action): PlanState {
  switch (action.type) {
    case PlanActionTypes.WatchPlan:
    case PlanActionTypes.WatchPlanFail:
    case PlanActionTypes.CreatePlan:
    case PlanActionTypes.DeletePlan:
      return state;

    case PlanActionTypes.UpdatePlan:
      const { plan } = (action as UpdatePlan).payload;
      const plans = state.plans.concat();
      updateDynamicList(plans, plan);
      sortByDatetime({ key: 'modified', objects: plans }, 'desc');
      return Object.assign({}, { ...state, plans });
  }
}

export const getPlans = (state: PlanState) => state.plans;
