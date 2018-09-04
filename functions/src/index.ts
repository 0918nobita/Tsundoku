import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as firebase from 'firebase';
import { Progress } from '../../shared/progress';
import { ResolvedBook, RegisteredBook } from '../../shared/entity';
import { ehb } from './ehb';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

// resolvedBooks コレクションで本を検索する
export const searchBooksByISBN = functions.https.onCall((isbn: string) =>
  db.collection('resolvedBooks')
    .where('isbn', '==', isbn)
    .get()
    .then(querySnapshot => {
      const response: Array<ResolvedBook> = [];
      querySnapshot.forEach(doc => {
        const docData = doc.data();
        response.push({
          desc: docData.desc,
          donor: docData.donor,
          image: docData.image,
          isbn: docData.isbn,
          title: docData.title
        });
      });
      return response;
    })
    .catch(error => error)
);

export const getBookshelf = functions.https.onCall((user: string) =>
  db.collection('bookshelf')
    .where('user', '==', user)
    .get()
    .then(querySnapshot => {
      const response: Array<RegisteredBook> = [];
      querySnapshot.forEach(doc => {
        const docData = doc.data();
        response.push({
          deadline: docData.deadline,
          favorite: docData.favorite,
          isbn: docData.isbn,
          progress: Progress.parse(docData.progress)
        });
      });
      return response;
    })
    .catch(error => error)
);

export const getContributions = functions.https.onRequest(ehb);
