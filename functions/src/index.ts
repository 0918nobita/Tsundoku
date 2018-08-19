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

/*
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
*/

/*
// ISBN 検索でヒットしなかった本を記録する
const registerBook = (isbn: string) =>
  db.collection('unresolvedBooks').add({
    isbn
  }).then().catch();
*/

// resolvedBooks コレクションで本を検索する
export const searchBooksByISBN = functions.https.onCall((isbn: string) =>
  db.collection('resolvedBooks')
    .where('isbn', '==', isbn)
    .get()
    .then(querySnapshot => {
      console.log(isbn);
      let response: Array<ResolvedBook>;
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
