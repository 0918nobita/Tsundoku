import {
  PlanState,
  SkillState,
  BookState,
  BookshelfState,
  AuthState
} from './_state.interfaces';

export const initialAuthState: AuthState = {
  user: undefined
};

export const initialBookState: BookState = {
  loading: false,
  bookDetail: null
};

export const initialBookshelfState: BookshelfState = {
  loading: false,
  books: []
};

export const initialPlanState: PlanState = {
  loading: false,
  plans: []
};

export const initialSkillState: SkillState = {
  loading: false,
  skills: []
};
