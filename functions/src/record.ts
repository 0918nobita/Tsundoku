import { Record } from '../../shared/entity';
import { Progress } from '../../shared/progress';

export const _getRecordsByISBN = (db: FirebaseFirestore.Firestore) =>
  (isbn: string) =>
    db.collection('records')
      .where('isbn', '==', isbn)
      .get()
      .then(querySnapshot => {
        const records: Record[] = [];

        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot.docs[i].data();
          records.push({
            created: docData.created,
            desc: docData.desc,
            isbn,
            range: Progress.parse(docData.range),
            user: docData.user
          });
        }

        return records;
      });
