import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as firebase from 'firebase';
import { Progress } from '../../shared/progress';
import { ResolvedBook, RegisteredBook } from '../../shared/entity';
import { ehb } from './ehb';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

namespace localFunctions {
  // resolvedBooks コレクションで本を検索する
  export const searchBooksByISBN = (isbn: string): Promise<Array<ResolvedBook>> =>
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
      .catch(error => error);

  export const getBookshelf = (user: string): Promise<Array<RegisteredBook>> =>
    db.collection('bookshelf')
      .where('user', '==', user)
      .get()
      .then(async querySnapshot => {
        const response: Array<RegisteredBook> = [];

        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot[i].data();

          // ISBNを元に本の詳細情報を取得する
          const book = await localFunctions.searchBooksByISBN(docData.isbn);
          if (book.length !== 0) {
            response.push({
              deadline: docData.deadline,
              favorite: docData.favorite,
              bookData: book[0],
              progress: Progress.parse(docData.progress)
            });
          }
        }
        return response;
      })
      .catch(error => error)
}

export const searchBooksByISBN = functions.https.onCall(localFunctions.searchBooksByISBN);

export const getBookshelf = functions.https.onCall(localFunctions.getBookshelf);

export const getContributions = functions.https.onRequest(ehb);
