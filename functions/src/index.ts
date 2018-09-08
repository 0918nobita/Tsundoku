import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { Progress } from '../../shared/progress';
import { ResolvedBook, RegisteredBook } from '../../shared/entity';
import { apiKey } from './config'
import { ehb } from './ehb';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

namespace localFunctions {

  // GoogleBooksAPI を用いて、ISBN で本を検索する
  const searchBooksUsingGoogleBooksAPI = (clue: string): Promise<ResolvedBook[]> =>
    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + clue + '&key=' + apiKey + '&country=JP')
      .then(async result => {
        let response: Array<ResolvedBook> = [];
        if (result.data.totalItems > 0) {
          response = result.data.items.map(({ volumeInfo }) => ({
            desc: volumeInfo.description,
            donor: 'none',
            image: 'https' + volumeInfo.imageLinks.smallThumbnail.slice(4),
            isbn: clue,
            title: volumeInfo.title
          }));
        }
        return response;
      })
      .catch(error => error);

  // resolvedBooks コレクションで本を検索する
  export const searchBooksByISBN = async (args: {isbn: string, usingGoogleBooksAPI: boolean}): Promise<Array<ResolvedBook>> => {
    let response: Array<ResolvedBook> = [];

    if (args.usingGoogleBooksAPI === true) {
      const books = await searchBooksUsingGoogleBooksAPI(args.isbn);
      if (books.length !== 0) response = books;
    }

    return db.collection('resolvedBooks')
      .where('isbn', '==', args.isbn)
      .get()
      .then(querySnapshot => {
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
  export const getBookshelf = async (user: string): Promise<RegisteredBook[]> =>
    db.collection('bookshelf')
      .where('user', '==', user)
      .get()
      .then(async querySnapshot => {
        const response: Array<RegisteredBook> = [];

        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot.docs[i].data();

          // ISBNを元に本の詳細情報を取得する
          const book = await localFunctions.searchBooksByISBN({isbn: docData.isbn, usingGoogleBooksAPI: true});

          if (book.length !== 0) response.push({
              deadline: docData.deadline,
              favorite: docData.favorite,
              progress: Progress.parse(docData.progress),
              desc: book[0].desc,
              donor: book[0].donor,
              image: book[0].image,
              isbn: docData.isbn,
              title: book[0].title
          });
        }

        return response;
      })
      .catch(error => error);
}

export const searchBooksByISBN = functions.https.onCall(localFunctions.searchBooksByISBN);

export const getBookshelf = functions.https.onCall(localFunctions.getBookshelf);

export const getContributions = functions.https.onRequest(ehb);
