import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { config } from './config';

admin.initializeApp(functions.config().firebase);

export const getBooks = functions.https.onCall(data =>
  admin.firestore().collection('books').get()
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

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
