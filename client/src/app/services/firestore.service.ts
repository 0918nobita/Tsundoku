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
  ref.where('uid', '==', firebase.auth().currentUser.uid);

export function updateDynamicList(
  list: ContainingCreated[],
  newElement: ContainingCreated
);

export function updateDynamicList(
  list: ContainingModified[],
  newElement: ContainingModified
);

export function updateDynamicList(list: any[], newElement) {
  let index;
  if (newElement.created !== void 0) {
    index = list
      .map(item => item.created.toMillis())
      .indexOf(newElement.created.toMillis());
  } else {
    index = list
      .map(item => item.modified.toMillis())
      .indexOf(newElement.modified.toMillis());
  }
  if (index !== -1) list.splice(index, 1);
  list.push(newElement);
}

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

export const sortByDatetime = (items: ContainingDatetime, order: Order) => {
  if (items.key === 'created') {
    items.objects.sort(sortFn(items.key, order));
  } else {
    items.objects.sort(sortFn(items.key, order));
  }
};
