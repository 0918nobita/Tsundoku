import { ResolvedBook } from './resolved-book';
import { RegisteredBook } from './registered-book';

export interface Plan {
  title: string;
  desc: string;
  book: ResolvedBook | RegisteredBook;
  progress: number;
  uid: string;
  created: firebase.firestore.Timestamp;
  modified: firebase.firestore.Timestamp;
}
