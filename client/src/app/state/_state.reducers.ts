import { ActionReducerMap } from '@ngrx/store';

import { State } from './_state.interfaces';
import * as fromAuth from './auth/auth.reducer';
import * as fromBookshelf from './bookshelf/bookshelf.reducer';
import * as fromPlan from './plan/plan.reducer';

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  bookshelf: fromBookshelf.reducer,
  plan: fromPlan.reducer
};
