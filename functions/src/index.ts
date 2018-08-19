import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

interface ResolvedBook {
  desc: string;
  donor: string;
  image: string;
  isbn: string;
  title: string;
}

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const getBooks = functions.https.onCall(data =>
  db.collection('books').get()
    .then(result => {
      let response = [];
      result.forEach(doc => {
        const docData = doc.data(),
              number = (docData.asin !== void 0) ? docData.asin : docData.isbn10;
        response.push({
          id: doc.id,
          title: docData.title,
          author: docData.author,
          number: number
        });
      });
      return response;
    })
    .catch(error => error)
);
