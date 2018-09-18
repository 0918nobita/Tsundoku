import { RegisteredBook } from '../../shared/entity';
import { Progress } from '../../shared/progress';
import { _searchBooksByISBN } from './book';

// 本棚の情報を取得する
export const _getBookshelf = (db: FirebaseFirestore.Firestore) =>
  async (name: string) =>
    new Promise(async (resolve: (value?:  RegisteredBook[]) => void,
                       reject:  (reason?: any)              => void) => {
      try {
        resolve(await db.collection('bookshelf')
          .where('user', '==', name)
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
          }));
      } catch(error) {
        console.log(error);
        reject([]);
      }
    });
