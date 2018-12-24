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
