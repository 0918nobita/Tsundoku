import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { Progress } from '../../shared/progress';
import { ResolvedBook, RegisteredBook, User } from '../../shared/entity';
import { apiKey } from './config'
import { ehb } from './ehb';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

namespace localFunctions {

  export const getUserByUID = (uid: string): Promise<User> =>
    db.collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const hitUsers: Array<User> = [];
        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot.docs[i].data();
          hitUsers.push({
            uid,
            bio: docData.bio,
            image: docData.image,
            name: docData.name,
            screenName: docData.screenName
          });
        }
        return hitUsers[0];
      })
      .catch(error => error);

  // GoogleBooksAPI を用いて、ISBN で本を検索する
  const searchBooksUsingGoogleBooksAPI = (clue: string): Promise<ResolvedBook[]> =>
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${clue}&key=${apiKey}&country=JP`)
      .then(async result => {
        let response: Array<ResolvedBook> = [];
        if (result.data.totalItems > 0) {
          response = result.data.items.map(({ volumeInfo }): ResolvedBook => ({
            desc: volumeInfo.description,
            donor: 'none',
            image: (volumeInfo.imageLinks !== void 0) ?
                `https${volumeInfo.imageLinks.smallThumbnail.slice(4)}` :
                './assets/image_not_found.png',
            isbn: clue,
            title: volumeInfo.title,
            pageCount: volumeInfo.pageCount
          }));

          for (let i = 0; i < response.length; i++)
            await localFunctions.postResolvedBook(response[i]);
        }
        return response;
      })
      .catch(error => error);

  // resolvedBooks コレクションで本を検索する
  export const searchBooksByISBN =
    async (args: {isbn: string, usingGoogleBooksAPI: boolean}): Promise<ResolvedBook[]> =>
      db.collection('resolvedBooks')
        .where('isbn', '==', args.isbn)
        .get()
        .then(async querySnapshot => {
          let response: Array<ResolvedBook> = [];

          for (let i = 0; i < querySnapshot.size; i++) {
            const docData = querySnapshot.docs[i].data();
            response.push({
              desc: docData.desc,
              donor: docData.donor,
              image: docData.image,
              isbn: docData.isbn,
              title: docData.title,
              pageCount: docData.pageCount
            });
          }

          if (response.length === 0 && args.usingGoogleBooksAPI === true)
            response = await searchBooksUsingGoogleBooksAPI(args.isbn);

          return response;
        })
        .catch(error => error);

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
              title: book[0].title,
              pageCount: book[0].pageCount
          });
        }

        return response;
      })
      .catch(error => error);

  export const postResolvedBook = (resolvedBook: ResolvedBook): Promise<string> =>
    db.collection('resolvedBooks')
      .add(resolvedBook)
      .then(docRef => docRef.id)
      .catch(error => {
        console.error(error);
        return 'Error';
      });
}

export const searchBooksByISBN = functions.https.onCall(localFunctions.searchBooksByISBN);

export const getBookshelf = functions.https.onCall(localFunctions.getBookshelf);

export const getContributions = functions.https.onRequest(ehb);

export const postResolvedBook = functions.https.onCall(localFunctions.postResolvedBook);
