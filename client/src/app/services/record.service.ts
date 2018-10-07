import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getRecordsByISBN(isbn: string): Observable<Record[]> {
    return this.afFirestore
      .collection<RecordInFirestore>('records', ref =>
        ref.where('isbn', '==', isbn)
      )
      .valueChanges()
      .pipe(
        map(records =>
          records.map(
            record =>
              <Record>{
                ...record,
                range: Progress.parse(record.range)
              }
          )
        )
      );
  }
}
