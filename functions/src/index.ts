import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _registerBook, _unregisterBook } from './bookshelf';
import { _createSkill, _deleteSkill } from './skill';
import { algoliaAdminConfig } from './config';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const registerBook = functions.https.onCall(_registerBook(db));
export const unregisterBook = functions.https.onCall(_unregisterBook(db));

export const createSkill = functions.https.onCall(_createSkill(db));
export const deleteSkill = functions.https.onCall(_deleteSkill(db));

const skillsCount = db.collection('skillsCount');
const index = algoliasearch(
  algoliaAdminConfig.appId,
  algoliaAdminConfig.apiKey
).initIndex(algoliaAdminConfig.indexName);

export const skillCountUp = functions.firestore
  .document('skills/{skillId}')
  .onCreate(snap => {
    const newValue = snap.data();
    const content = newValue.content;
    skillsCount
      .where('content', '==', content)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          const ref = await skillsCount.add({
            content,
            count: 1
          });
          const isbn = newValue.isbn;
          index.addObject({ content, isbn }, (err, res) => {
            if (err) console.error(err);
            skillsCount.doc(ref.id).update({ objectID: res.objectID });
          });
        } else {
          const first = querySnapshot.docs[0];
          const count: number = first.data().count;
          skillsCount.doc(first.id).update({
            count: count + 1
          });
        }
      });
    return 0;
  });

export const skillCountDown = functions.firestore
  .document('skills/{skillId}')
  .onDelete(snap => {
    const content = snap.data().content;
    skillsCount
      .where('content', '==', content)
      .get()
      .then(async querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          console.warn('skillsCount との同期に失敗しました');
        } else {
          const first = querySnapshot.docs[0];
          const count: number = first.data().count;
          if (count <= 1) {
            const objectID = (await skillsCount.doc(first.id).get()).data()
              .objectID;
            index.deleteObject(objectID, err => {
              if (err) console.error(err);
            });
          } else {
            skillsCount.doc(first.id).update({
              count: count - 1
            });
          }
        }
      });
    return 0;
  });
