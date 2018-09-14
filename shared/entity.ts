import * as firebase from '../functions/node_modules/firebase';
import { Progress } from './progress';

export interface User {
  bio: string;
  image: string;
  name: string;
  screenName: string;
  uid: string;
}

export interface ResolvedBook {
  desc: string;
  donor: string;
  image: string;
  isbn: string;
  title: string;
  pageCount: number;
}

export interface RegisteredBook extends ResolvedBook {
  deadline: firebase.firestore.Timestamp;
  favorite: boolean;
  progress: Progress;
}
