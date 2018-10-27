import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { _searchBooksByISBN, _postResolvedBook } from "./book";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const searchBooksByISBN = functions.https.onCall(_searchBooksByISBN(db));
export const postResolvedBook = functions.https.onCall(_postResolvedBook(db));
