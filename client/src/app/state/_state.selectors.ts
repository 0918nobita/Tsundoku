import { createSelector } from '@ngrx/store';

import { State, PlanState } from './_state.interfaces';

export const getPlan = (state: State) => state.plan;

export const getPlans = createSelector(getPlan, (state: PlanState) => state.plans);
