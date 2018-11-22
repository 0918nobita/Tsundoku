import { createSelector } from '@ngrx/store';

import { State, PlanState, AuthState } from './_state.interfaces';

export const getAuth = (state: State) => state.auth;

export const getUser = createSelector(
  getAuth,
  (state: AuthState) => state.user
);

export const getPlan = (state: State) => state.plan;

export const getPlans = createSelector(
  getPlan,
  (state: PlanState) => state.plans
);
