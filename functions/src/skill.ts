import * as admin from "firebase-admin";

export const _createSkill = (db: FirebaseFirestore.Firestore) =>
  async (args: {
    isbn: string;
    content: string;
    uid: string;
  }) => {
    const date = admin.firestore.FieldValue.serverTimestamp();
    return (await db.collection('skills').add({
      ...args,
      created: date,
      modified: date
    })).id;
  };

export const _deleteSkill = (db: FirebaseFirestore.Firestore) =>
  async (id: string) => {
    try {
      await db.collection('skill').doc(id).delete();
      return true;
    } catch {
      return false;
    }
  };
