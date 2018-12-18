import * as admin from 'firebase-admin';

export const _registerBook = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  uid: string;
}) => {
  const date = admin.firestore.FieldValue.serverTimestamp();
  return (await db.collection('bookshelf').add({
    ...args,
    created: date,
    modified: date
  })).id;
};

export const _unregisterBook = (
  db: FirebaseFirestore.Firestore
) => async (args: { isbn: string; uid: string }): Promise<boolean> => {
  try {
    const querySnapshots = (await db
      .collection('bookshelf')
      .where('uid', '==', args.uid)
      .get()).docs;

    for (const snapshot of querySnapshots) {
      const data = snapshot.data();
      if (data.isbn !== void 0 && data.isbn === args.isbn) {
        await db
          .collection('bookshelf')
          .doc(snapshot.id)
          .delete();
        return true;
      }
    }

    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
