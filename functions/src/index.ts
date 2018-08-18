import * as admin from 'firebase-admin';
import axios from 'axios';
import * as functions from 'firebase-functions';

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

export const searchBooks = functions.https.onCall(data =>
  axios.get('https://www.googleapis.com/books/v1/volumes?q=' + encodeURI(data))
    .then(result => result)
    .catch(error => 'Error: ' + error);
