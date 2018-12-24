import * as firebase from 'firebase/app';
import 'firebase/auth';

type ContainingCreated = {
  created: firebase.firestore.Timestamp;
};

type ContainingModified = {
  modified: firebase.firestore.Timestamp;
};

type ContainingDatetime =
  | {
      key: 'created';
      objects: ContainingCreated[];
    }
  | {
      key: 'modified';
      objects: ContainingModified[];
    };

export const mine = (ref: firebase.firestore.Query) =>
  ref.where('uid', '==', (firebase.auth().currentUser as firebase.User).uid);

type Order = 'asc' | 'desc';

const sortFn = (fieldName: string, order: Order) => (
  former,
  latter
): number => {
  const asc = order === 'asc',
    formerMillis = former[fieldName].toMillis(),
    latterMillis = latter[fieldName].toMillis();

  if (formerMillis < latterMillis) {
    return asc ? -1 : 1;
  } else if (formerMillis > latterMillis) {
    return asc ? 1 : -1;
  }

  return 0;
};

export const sortByDatetime = (items: ContainingDatetime, order: Order) => {
  if (items.key === 'created') {
    items.objects.sort(sortFn(items.key, order));
  } else {
    items.objects.sort(sortFn(items.key, order));
  }
};
