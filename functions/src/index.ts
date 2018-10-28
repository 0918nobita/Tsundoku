import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { _searchBooksByISBN, _postResolvedBook } from "./book";
import { _registerBook } from "./bookshelf";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));

export const registerBook = functions.https.onCall(_registerBook(db));
