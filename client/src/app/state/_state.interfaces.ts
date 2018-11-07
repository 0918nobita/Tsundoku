import { RegisteredBook } from '../models/registered-book';
import { Plan } from '../models/plan';
import { Skill } from '../models/skill';

export interface State {
  bookshelf: RegisteredBook[];
  plans: Plan[];
  skills: Skill[];
}
