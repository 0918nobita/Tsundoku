import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _getUsersBy } from './user';
import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _getBookshelfBy } from './bookshelf';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const getUsersByUID = functions.https.onCall(_getUsersBy('uid', db));
export const getUsersByName = functions.https.onCall(_getUsersBy('name', db));

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const getBookshelfByUID = functions.https.onCall(_getBookshelfBy('uid', db));
export const getBookshelfByName = functions.https.onCall(_getBookshelfBy('name', db));
