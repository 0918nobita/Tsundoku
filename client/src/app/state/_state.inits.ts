import { PlanState, BookshelfState, AuthState } from './_state.interfaces';

export const initialAuthState: AuthState = {
  user: undefined
};

export const initialBookshelfState: BookshelfState = {
  loading: false,
  books: []
};

export const initialPlanState: PlanState = {
  loading: false,
  plans: []
};
