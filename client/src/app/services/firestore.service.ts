import * as firebase from 'firebase/app';
import 'firebase/auth';

export const mine = (ref: firebase.firestore.Query) =>
  ref.where('uid', '==', firebase.auth().currentUser.uid);

type Order = 'asc' | 'desc';

const sortFn = (fieldName: string, order: Order) => (
  former,
  latter
): number => {
  const asc = order === 'asc',
    formerMillis = former.modified.toMillis(),
    latterMillis = latter.modified.toMillis();

  if (formerMillis < latterMillis) {
    return asc ? -1 : 1;
  } else if (formerMillis > latterMillis) {
    return asc ? 1 : -1;
  }

  return 0;
};

export const sortByDatetime = (
  items:
    | {
        key: 'created';
        objects: { created: firebase.firestore.Timestamp }[];
      }
    | {
        key: 'modified';
        objects: { modified: firebase.firestore.Timestamp }[];
      },
  order: Order
) => {
  if (items.key === 'created') {
    items.objects.sort(sortFn(items.key, order));
  } else {
    items.objects.sort(sortFn(items.key, order));
  }
};
