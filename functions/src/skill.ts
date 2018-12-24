import * as admin from 'firebase-admin';

export const _createSkill = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  content: string;
  uid: string;
}) => {
  const date = admin.firestore.FieldValue.serverTimestamp();
  return (await db.collection('skills').add({
    ...args,
    created: date
  })).id;
};

export const _deleteSkill = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  content: string;
  uid: string;
}) => {
  try {
    const docs = (await db
      .collection('skills')
      .where('uid', '==', args.uid)
      .get()).docs;
    for (const doc of docs) {
      const data = doc.data();
      if (
        data.isbn !== void 0 &&
        data.isbn === args.isbn &&
        data.content !== void 0 &&
        data.content === args.content
      ) {
        await db
          .collection('skills')
          .doc(doc.id)
          .delete();
      }
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
