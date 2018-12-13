import axios from "axios";

import { ResolvedBook } from '../../shared/entity';
import { apiKey } from './config';

export const _postResolvedBook = (db: FirebaseFirestore.Firestore) => async (
  resolvedBook: ResolvedBook
) => {
  return (await db.collection('resolvedBook').add(resolvedBook)).id;
};

const searchBooksUsingGoogleBooksAPI = (
  db: FirebaseFirestore.Firestore
) => async (clue: string): Promise<ResolvedBook[]> => {
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${clue}&key=${apiKey}&country=JP`
  );
  let response: ResolvedBook[] = [];
  if (result.data.totalItems > 0) {
    response = result.data.items.map(
      ({ volumeInfo }): ResolvedBook => ({
        desc: volumeInfo.description,
        donor: 'none',
        image:
          volumeInfo.imageLinks !== void 0
            ? `https${volumeInfo.imageLinks.smallThumbnail.slice(4)}`
            : './assets/image_not_found.png',
        isbn: clue,
        title: volumeInfo.title,
        pageCount: volumeInfo.pageCount
      })
    );

    for (const item of response) await _postResolvedBook(db)(item);
  }

  return response;
};

export const _searchBooksByISBN = (
  db: FirebaseFirestore.Firestore
) => async (args: { isbn: string; usingGoogleBooksAPI: boolean }) => {
  const querySnapshot = await db
    .collection('resolvedBooks')
    .where('isbn', '==', args.isbn)
    .get();
  let response: ResolvedBook[] = [];

  for (const doc of querySnapshot.docs) response.push(<ResolvedBook>doc.data());

  if (response.length === 0 && args.usingGoogleBooksAPI === true)
    response = await searchBooksUsingGoogleBooksAPI(db)(args.isbn);

  return response;
};
