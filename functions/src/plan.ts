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
