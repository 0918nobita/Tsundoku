import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _searchBooksByISBN, _postResolvedBook } from './book';
import { Progress } from '../../shared/progress';
import { RegisteredBook, User } from '../../shared/entity';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

namespace localFunctions {

  export const getUsersByUID = (uid: string): Promise<Array<User>> =>
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
        return hitUsers;
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
}

export const getUsersByUID = functions.https.onCall(localFunctions.getUsersByUID);

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));

export const getBookshelf = functions.https.onCall(localFunctions.getBookshelf);

export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));
