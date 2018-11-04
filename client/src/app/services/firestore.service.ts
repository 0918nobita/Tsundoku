import * as firebase from 'firebase/app';
import 'firebase/auth';

export const mine = (ref: firebase.firestore.Query) =>
  ref.where('uid', '==', firebase.auth().currentUser.uid);

export const sortByModifiedDatetime = (
  items: { modified: firebase.firestore.Timestamp }[],
  order: 'asc' | 'desc'
) =>
  items.sort((former, latter) => {
    const asc = order === 'asc',
      formerMillis = former.modified.toMillis(),
      latterMillis = latter.modified.toMillis();

    if (formerMillis < latterMillis) {
      return asc ? -1 : 1;
    } else if (formerMillis > latterMillis) {
      return asc ? 1 : -1;
    }

    return 0;
  });
