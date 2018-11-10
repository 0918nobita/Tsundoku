import { Plan } from '../models/plan';
import { Skill } from '../models/skill';

export interface State {
  book: BookState;
  bookshelf: BookshelfState;
  plan: PlanState;
  skill: SkillState;
}

export interface BookState {
  loading: boolean;
}

export interface BookshelfState {
  loading: boolean;
}

export interface PlanState {
  loading: boolean;
  plans: Plan[];
}

export interface SkillState {
  loading: boolean;
  skills: Skill[];
}
