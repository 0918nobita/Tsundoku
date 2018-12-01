import { Plan } from '../models/plan';
import { Skill } from '../models/skill';
import { ResolvedBook } from '../models/resolved-book';
import { RegisteredBook } from '../models/registered-book';

export interface State {
  auth: AuthState;
  book: BookState;
  bookshelf: BookshelfState;
  plan: PlanState;
  skill: SkillState;
}

export interface AuthState {
  user: firebase.User | null | undefined;
}

export interface BookState {
  loading: boolean;
  bookDetail: ResolvedBook | null;
}

export interface BookshelfState {
  loading: boolean;
  books: RegisteredBook[];
}

export interface PlanState {
  loading: boolean;
  plans: Plan[];
}

export interface SkillState {
  loading: boolean;
  skills: Skill[];
}
