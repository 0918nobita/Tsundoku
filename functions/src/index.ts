import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { Progress } from '../../shared/progress';
import { ResolvedBook, RegisteredBook } from '../../shared/entity';
import { ehb } from './ehb';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

namespace localFunctions {

  // GoogleBooksAPI を用いて、ISBN で本を検索する
  const searchBooksUsingGoogleBooksAPI = (clue: string): Promise<Array<ResolvedBook>> =>
    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + clue)
      .then(async result => {
        const response: Array<ResolvedBook> = [];
        if (result.data.items !== void 0) {
          // ヒットした場合は取り出してサムネを出力する
          result.data.items.map((item, index) =>
            response.push({
              desc: item.volumeInfo.description,
              donor: 'none',
              image: 'https' + item.volumeInfo.imageLinks.smallThumbnail.slice(4),
              isbn: clue,
              title: item.volumeInfo.title
            }));
        }
        return response;
      })
      .catch(error => error);

  // resolvedBooks コレクションで本を検索する
  export const searchBooksByISBN = (args: {isbn: string, usingGoogleBooksAPI: boolean}): Promise<Array<ResolvedBook>> => {
    
    if (args.usingGoogleBooksAPI === true)
      return searchBooksUsingGoogleBooksAPI(args.isbn);

    return db.collection('resolvedBooks')
      .where('isbn', '==', args.isbn)
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
  }

  // 本棚の情報を取得する
  export const getBookshelf = (user: string): Promise<Array<RegisteredBook>> =>
    db.collection('bookshelf')
      .where('user', '==', user)
      .get()
      .then(async querySnapshot => {
        const response: Array<RegisteredBook> = [];

        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot[i].data();

          // ISBNを元に本の詳細情報を取得する
          const book = await localFunctions.searchBooksByISBN({isbn: docData.isbn, usingGoogleBooksAPI: false});

          if (book.length !== 0) response.push({
              deadline: docData.deadline,
              favorite: docData.favorite,
              bookData: book[0],
              progress: Progress.parse(docData.progress)
          });
        }

        return response;
      })
      .catch(error => error);
}

export const searchBooksByISBN = functions.https.onCall(localFunctions.searchBooksByISBN);

export const getBookshelf = functions.https.onCall(localFunctions.getBookshelf);

export const getContributions = functions.https.onRequest(ehb);
