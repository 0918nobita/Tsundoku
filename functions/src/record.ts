import { Record } from '../../shared/entity';
import { Progress } from '../../shared/progress';

export const _getRecordsByISBN = (db: FirebaseFirestore.Firestore) =>
  async (isbn: string) => {
    const querySnapshot = await db.collection('records')
        .where('isbn', '==', isbn)
        .get();
    const records: Record[] = [];
    for (const doc of querySnapshot.docs) {
      const docData = doc.data();
      records.push({
        created: docData.created,
        desc: docData.desc,
        isbn,
        range: Progress.parse(docData.range),
        user: docData.user
      });
    }
    return records;
  };
