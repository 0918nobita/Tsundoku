import * as firebase from 'firebase/app';

import { ResolvedBook } from './resolved-book';

export interface RegisteredBook extends ResolvedBook {
  created: firebase.firestore.Timestamp;
  modified: firebase.firestore.Timestamp;
}
