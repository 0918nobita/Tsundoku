import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const getBooks = functions.https.onCall((data, context) => {
  return db.collection('books').get()
    .then(result => {
      let str = '';
      result.forEach(doc => {
        const docData = doc.data();
        const id = (docData.asin !== void 0) ? docData.asin : docData.isbn13;
        str += doc.id + ' => ' + docData.title + ', ' + docData.author + ', ' + id + '\n';
      });
      return str;
    })
    .catch(error => error);
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
