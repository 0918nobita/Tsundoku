import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { _getUsersBy } from './user';
import { _checkConnectionFrom, _getUsersConnectedFrom } from './connection';
import { _searchBooksByISBN, _postResolvedBook } from './book';
import { _getBookshelf } from './bookshelf';
import { _getRecordsByISBN } from './record';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const getUsersByUID = functions.https.onCall(_getUsersBy('uid', db));
export const getUsersByName = functions.https.onCall(_getUsersBy('name', db));

export const checkConnectionFrom = functions.https.onCall(_checkConnectionFrom(db));
export const getUsersConnectedFrom = functions.https.onCall(_getUsersConnectedFrom(db));

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const getBookshelf = functions.https.onCall(_getBookshelf(db));

export const getRecordsByISBN = functions.https.onCall(_getRecordsByISBN(db));
