import { createSelector } from '@ngrx/store';

import {
  State,
  PlanState,
  AuthState,
  BookshelfState,
  SkillState
} from './_state.interfaces';

export const getAuth = (state: State) => state.auth;

export const getUser = createSelector(
  getAuth,
  (state: AuthState) => state.user
);

export const getBookshelf = (state: State) => state.bookshelf;

export const getBooks = createSelector(
  getBookshelf,
  (state: BookshelfState) => state.books
);

export const getPlan = (state: State) => state.plan;

export const getPlans = createSelector(
  getPlan,
  (state: PlanState) => state.plans
);

export const isLoadingPlan = createSelector(
  getPlan,
  (state: PlanState) => state.loading
);

export const getSkill = (state: State) => state.skill;

export const getSkills = createSelector(
  getSkill,
  (state: SkillState) => state.skills
);

export const getSkillProgress = createSelector(
  getSkill,
  (state: SkillState) => state.progress
);
