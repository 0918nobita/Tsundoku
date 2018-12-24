import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _registerBook, _unregisterBook } from './bookshelf';
import { _createSkill, _deleteSkill } from './skill';
import { algoliaAdminConfig } from './config';
import { _updatePlan } from './plan';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const registerBook = functions.https.onCall(_registerBook(db));
export const unregisterBook = functions.https.onCall(_unregisterBook(db));

export const createPlan = functions.https.onCall(_createSkill(db));
export const updatePlan = functions.https.onCall(_updatePlan(db));

export const createSkill = functions.https.onCall(_createSkill(db));
export const deleteSkill = functions.https.onCall(_deleteSkill(db));

export const withdraw = functions.https.onCall(
  async ({ uid }: { uid: string }) => {
    await admin.auth().deleteUser(uid);
    const collections = ['bookshelf', 'plans', 'skills'];
    const firestore = admin.firestore();
    for (const collection of collections) {
      const snapshot = await firestore
        .collection(collection)
        .where('uid', '==', uid)
        .get();
      const docs = snapshot.docs;
      for (const doc of docs) {
        if (collection === 'skills') {
          const skillCountRef = (await firestore
            .collection('skillsCount')
            .where('isbn', '==', doc.data().isbn)
            .get()).docs[0];
          await firestore
            .collection('skillsCount')
            .doc(skillCountRef.id)
            .update({
              count: skillCountRef.data().count - 1
            });
        }
        await firestore.doc(doc.id).delete();
      }
    }
  }
);

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
            const doc = skillsCount.doc(first.id);
            const objectID = (await doc.get()).data().objectID;
            doc.delete();
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

export const deletePlan = functions.firestore
  .document('bookshelf/{id}')
  .onDelete(async snap => {
    const { isbn, uid } = snap.data();
    const plans = db.collection('plans');
    const id = (await plans
      .where('isbn', '==', isbn)
      .where('uid', '==', uid)
      .get()).docs[0].id;
    await plans.doc(id).delete();
    return 0;
  });

export const deleteAllSkills = functions.firestore
  .document('plans/{id}')
  .onDelete(async snap => {
    const { isbn, uid } = snap.data();
    const skills = db.collection('skills');
    const ids = (await skills
      .where('isbn', '==', isbn)
      .where('uid', '==', uid)
      .get()).docs.map(doc => doc.id);
    for (const id of ids) {
      await skills.doc(id).delete();
    }
    return 0;
  });
