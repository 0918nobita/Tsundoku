import { User } from '../../shared/entity';

export const _getUserBy = (field: 'name' | 'uid', db: FirebaseFirestore.Firestore) =>
  (value: string): Promise<User> =>
    db.collection('users')
      .where(field, '==', value)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 0) {
          return null;
        } else {
          if (querySnapshot.size > 1)
            console.warn(`同一の ${field} を持ったユーザーが複数存在しています (value: ${value})`);
          const docData = querySnapshot.docs[0].data();
          return {
            uid: docData.uid,
            bio: docData.bio,
            image: docData.image,
            name: docData.name,
            screenName: docData.screenName
          };
        }
      })
      .catch(error => {
        console.error(error);
        return null;
      });
