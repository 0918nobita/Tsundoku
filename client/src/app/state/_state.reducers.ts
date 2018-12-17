import { ActionReducerMap } from '@ngrx/store';

import { State } from './_state.interfaces';
import * as fromAuth from './auth/auth.reducer';
import * as fromBookshelf from './bookshelf/bookshelf.reducer';
import * as fromPlan from './plan/plan.reducer';
import * as fromSkill from './skill/skill.reducer';
import * as fromBook from './book/book.reducer';

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  book: fromBook.reducer,
  bookshelf: fromBookshelf.reducer,
  plan: fromPlan.reducer,
  skill: fromSkill.reducer
};
