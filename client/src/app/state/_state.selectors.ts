import { createSelector } from '@ngrx/store';

import { State, PlanState, AuthState, BookState } from './_state.interfaces';

export const getAuth = (state: State) => state.auth;

export const getUser = createSelector(
  getAuth,
  (state: AuthState) => state.user
);

export const getBook = (state: State) => state.book;

export const getBookDetail = createSelector(
  getBook,
  (state: BookState) => state.bookDetail
);

export const nowLoadingBook = createSelector(
  getBook,
  (state: BookState) => state.loading
);

export const getPlan = (state: State) => state.plan;

export const getPlans = createSelector(
  getPlan,
  (state: PlanState) => state.plans
);
