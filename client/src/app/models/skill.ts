import * as firebase from 'firebase/app';

import { ResolvedBook } from './resolved-book';
import { RegisteredBook } from './registered-book';
import { Plan } from './plan';

export interface Skill {
  content: string;
  book: ResolvedBook | RegisteredBook;
  plan: Plan;
  uid: string;
  created: firebase.firestore.Timestamp;
}
