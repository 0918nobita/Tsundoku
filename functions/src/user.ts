import { User } from '../../shared/entity';

export const _getUsersBy = (field: 'name' | 'uid', db: FirebaseFirestore.Firestore) =>
  (value: string): Promise<Array<User>> =>
    db.collection('users')
      .where(field, '==', value)
      .get()
      .then(querySnapshot => {
        const hitUsers: Array<User> = [];
        for (let i = 0; i < querySnapshot.size; i++) {
          const docData = querySnapshot.docs[i].data();
          hitUsers.push({
            uid: docData.uid,
            bio: docData.bio,
            image: docData.image,
            name: docData.name,
            screenName: docData.screenName
          });
        }
        return hitUsers;
      })
      .catch(error => error);
