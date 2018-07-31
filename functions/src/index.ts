import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export const getBooks = functions.https.onCall((data, context) => {
  return db.collection('books').get()
    .then(result => {
      let response = [];
      result.forEach(doc => {
        const docData = doc.data();
        const number = (docData.asin !== void 0) ? docData.asin : docData.isbn13;
        response.push({
          id: doc.id,
          title: docData.title,
          author: docData.author,
          number: number
        });
      });
      return response;
    })
    .catch(error => error);
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
