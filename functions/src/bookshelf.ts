export const _registerBook = (db: FirebaseFirestore.Firestore) => async (args: {
  isbn: string;
  uid: string;
}) => {
  return (await db.collection("bookshelf").add(args)).id;
};
