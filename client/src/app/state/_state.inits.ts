import {
  PlanState,
  SkillState,
  BookState,
  BookshelfState,
  AuthState
} from './_state.interfaces';

export const initialAuthState: AuthState = {
  user: null
};

export const initialBookState: BookState = {
  loading: false,
  bookDetail: null
};

export const initialBookshelfState: BookshelfState = {
  loading: false
};

export const initialPlanState: PlanState = {
  loading: false,
  plans: []
};

export const initialSkillState: SkillState = {
  loading: false,
  skills: []
};
