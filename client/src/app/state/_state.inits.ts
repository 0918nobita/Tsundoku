import {
  PlanState,
  SkillState,
  BookState,
  BookshelfState
} from './_state.interfaces';

export const initialBookState: BookState = {
  loading: false
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
