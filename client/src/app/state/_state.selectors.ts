import { createSelector } from '@ngrx/store';

import { State } from './_state.interfaces';
import * as fromPlan from './plan.reducer';

export const getPlan = (state: State) => state.plan;

export const getPlans = createSelector(getPlan, fromPlan.getPlans);
