import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _registerBook, _unregisterBook } from './bookshelf';
import { _createSkill, _deleteSkill } from './skill';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const registerBook = functions.https.onCall(_registerBook(db));
export const unregisterBook = functions.https.onCall(_unregisterBook(db));

export const createSkill = functions.https.onCall(_createSkill(db));
export const deleteSkill = functions.https.onCall(_deleteSkill(db));

export const updateSkillCount = functions.firestore
  .document('skills/{skillId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    console.log(newValue);
  });
