import { RegisteredBook } from '../../shared/entity';
import { Progress } from '../../shared/progress';
import { _searchBooksByISBN } from './book';

// 本棚の情報を取得する
export const _getBookshelfBy = (field: 'name' | 'uid', db: FirebaseFirestore.Firestore) =>
  async (value: string): Promise<RegisteredBook[]> =>
    db.collection('bookshelf')
      .where(field, '==', value)
      .get()
      .then(async querySnapshot => {
        const response: Array<RegisteredBook> = [];

        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot.docs[i].data();

          // ISBNを元に本の詳細情報を取得する
          const book = await _searchBooksByISBN(db)({isbn: docData.isbn, usingGoogleBooksAPI: true});

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
