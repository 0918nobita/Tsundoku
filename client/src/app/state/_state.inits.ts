import {
  PlanState,
  SkillState,
  BookshelfState,
  AuthState,
  BookState
} from './_state.interfaces';

export const initialAuthState: AuthState = {
  user: undefined
};

export const initialBookState: BookState = {
  progress: 'complete'
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
  progress: 'complete',
  skills: []
};
