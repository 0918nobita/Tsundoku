import * as admin from 'firebase-admin';

export const _createPlan = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  uid: string;
  title: string;
  desc: string;
}) => {
  console.log('呼び出されました');
  const date = admin.firestore.FieldValue.serverTimestamp();
  const plan = {
    isbn: args.isbn,
    uid: args.uid,
    title: args.title,
    desc: args.desc,
    progress: 0,
    created: date,
    modified: date
  };
  console.log(plan);
  return (await db.collection('plans').add(plan)).id;
};

export const _updatePlan = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  uid: string;
  title: string;
  desc: string;
  progress: number;
}) => {
  try {
    const plans = db.collection('plans');
    const docs = (await plans
      .where('isbn', '==', args.isbn)
      .where('uid', '==', args.uid)
      .get()).docs;
    if (docs.length === 0) return false;
    await plans.doc(docs[0].id).update(args);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
