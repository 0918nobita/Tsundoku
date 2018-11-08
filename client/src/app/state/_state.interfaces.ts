import { Plan } from '../models/plan';
import { Skill } from '../models/skill';

export interface State {
  book: BookState;
  bookshelf: BookshelfState;
  plan: PlanState;
  skill: SkillState;
}

export interface BookState {}

export interface BookshelfState {}

export interface PlanState {
  plans: Plan[];
}

export interface SkillState {
  skills: Skill[];
}
