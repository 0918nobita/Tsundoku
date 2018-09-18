import axios from 'axios';

import { ResolvedBook } from '../../shared/entity';
import { apiKey } from './config';

export const _postResolvedBook = (db: FirebaseFirestore.Firestore) =>
  (resolvedBook: ResolvedBook): Promise<string> =>
    db.collection('resolvedBooks')
      .add(resolvedBook)
      .then(docRef => docRef.id)
      .catch(error => {
        console.error(error);
        return 'Error';
      });

// GoogleBooksAPI を用いて、ISBN で本を検索する
const searchBooksUsingGoogleBooksAPI = (db: FirebaseFirestore.Firestore) =>
  (clue: string): Promise<ResolvedBook[]> =>
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
            await _postResolvedBook(db)(response[i]);
        }
        return response;
      })
      .catch(error => error);

// resolvedBooks コレクションで本を検索する
export const _searchBooksByISBN = (db: FirebaseFirestore.Firestore) =>
  async (args: {isbn: string, usingGoogleBooksAPI: boolean}) =>
    new Promise(async (resolve: (value?:  ResolvedBook[]) => void,
                       reject:  (reason?: any)            => void) => {
      try {
        resolve(await db.collection('db')
          .where('isbn', '==', args.isbn)
          .get()
          .then(async querySnapshot => {
            let response: ResolvedBook[] = [];

            for (let i = 0; i < querySnapshot.size; i++) {
              const docData = querySnapshot.docs[i].data();
              response.push(<ResolvedBook> docData);
            }

            if (response.length === 0 && args.usingGoogleBooksAPI === true)
              response = await searchBooksUsingGoogleBooksAPI(db)(args.isbn);

            return response;
          }));
      } catch(error) {
        console.error(error);
        reject([]);
      }
    });
