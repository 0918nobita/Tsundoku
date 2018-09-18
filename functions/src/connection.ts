export const _checkConnectionFrom = (db: FirebaseFirestore.Firestore) =>
  (args: {name: string, to: string}) =>
    db.collection('connections')
      .where('from', '==', args.name)
      .where('to', '==', args.to)
      .get()
      .then(querySnapshot => querySnapshot.size > 0);

