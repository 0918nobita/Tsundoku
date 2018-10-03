import { RegisteredBook } from '../../shared/entity';
import { Progress } from '../../shared/progress';
import { _searchBooksByISBN } from './book';

export function _getBookshelf(db: FirebaseFirestore.Firestore) {
  return async (name: string): Promise<RegisteredBook[]> => {
    const querySnapshot = await db
        .collection('bookshelf')
        .where('user', '==', name)
        .get();

    const response: RegisteredBook[] = [];

    for (let i = 0; i < querySnapshot.size; i++) {
      const docData = querySnapshot.docs[i].data();
      const book = await _searchBooksByISBN(db)(
          { isbn: docData.isbn, usingGoogleBooksAPI: true });

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
  };
}
