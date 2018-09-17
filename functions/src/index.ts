import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _getBookshelf } from './bookshelf';
import { User } from '../../shared/entity';

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
}

export const getUsersByUID = functions.https.onCall(localFunctions.getUsersByUID);

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));

export const getBookshelf = functions.https.onCall(_getBookshelf(db));

export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));
