import { User } from '../../shared/entity';
import { _getUsersBy } from './user';

export const _checkConnectionFrom = (db: FirebaseFirestore.Firestore) =>
  (args: {name: string, to: string}) =>
    db.collection('connections')
      .where('from', '==', args.name)
      .where('to', '==', args.to)
      .get()
      .then(querySnapshot => querySnapshot.size > 0);

export const _getUsersConnectedFrom = (db: FirebaseFirestore.Firestore) =>
  (name: string) => new Promise(async (resolve: (value: User[]) => void,
                                       reject:  (reason?: any)  => void) => {
    try {
      const users: User[] = [];
      const names = await db.collection('connections')
        .where('from', '==', name)
        .get()
        .then(querySnapshot => {
          const response: string[] = [];

          for (let i = 0; i < querySnapshot.size; i++)
            response.push(querySnapshot.docs[i].data().to);

          return response;
        });

      for (let i = 0; i < names.length; i++)
        users.concat(await _getUsersBy('name', db)(names[i]));

      resolve(users);
    } catch(error) {
      reject(error);
    }
  });
