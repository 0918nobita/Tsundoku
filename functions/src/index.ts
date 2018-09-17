import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _getUsersByUID } from './user';
import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _getBookshelf } from './bookshelf';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const getUsersByUID = functions.https.onCall(_getUsersByUID(db));

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const getBookshelf = functions.https.onCall(_getBookshelf(db));
