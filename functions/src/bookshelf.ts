import * as admin from "firebase-admin";

export const _registerBook = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  uid: string;
}) => {
  const date = admin.firestore.FieldValue.serverTimestamp();
  return (await db.collection("bookshelf").add({
    ...args,
    created: date,
    modified: date
  })).id;
};
