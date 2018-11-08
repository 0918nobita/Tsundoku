import { createFeatureSelector, createSelector } from "@ngrx/store";

import { State } from "./_state.interfaces";
import * as fromPlan from './plan.reducer';

export const getFeatureState = createFeatureSelector<State>('store');

export const getPlan = createSelector(getFeatureState, s => s.plan);

export const getPlans = createSelector(getPlan, fromPlan.getPlans);
