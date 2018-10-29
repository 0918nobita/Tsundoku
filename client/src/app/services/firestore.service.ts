import * as firebase from 'firebase/app';
import 'firebase/auth';

export const mine = (ref: firebase.firestore.Query) =>
  ref.where('uid', '==', firebase.auth().currentUser.uid);
