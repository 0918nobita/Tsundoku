import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase';

import { Record } from 'shared/entity';
import { Progress } from 'shared/progress';

interface RecordInFirestore {
  created: firebase.firestore.Timestamp;
  desc: string;
  isbn: string;
  range: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private afFirestore: AngularFirestore) {}

  async getRecordsByISBN(isbn: string): Promise<Record[]> {
    const records = await this.afFirestore
        .collection<RecordInFirestore>('records', ref => ref.where('isbn', '==', isbn))
        .valueChanges().pipe(take(1)).toPromise();
    return records.map(item => (<Record> {
        created: item.created,
        desc: item.desc,
        isbn: item.isbn,
        range: Progress.parse(item.range),
        user: item.user
      }));
  }
}
