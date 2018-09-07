import * as firebase from '../functions/node_modules/firebase';
import { Progress } from './progress';

export interface ResolvedBook {
  desc: string;
  donor: string;
  image: string;
  isbn: string;
  title: string;
}

export interface RegisteredBook {
  deadline: firebase.firestore.Timestamp;
  favorite: boolean;
  bookData: ResolvedBook;
  progress: Progress;
}
