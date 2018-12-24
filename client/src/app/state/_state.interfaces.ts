import { Plan } from '../models/plan';
import { Skill } from '../models/skill';
import { RegisteredBook } from '../models/registered-book';
import { ResolvedBook } from '../models/resolved-book';

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
  progress: 'complete' | 'adding' | 'deleting';
  bookDetails?: ResolvedBook | RegisteredBook;
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
  progress: 'complete' | 'adding' | 'deleting';
  skills: Skill[];
  skillDetails: Skill[];
}
