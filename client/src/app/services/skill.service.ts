import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Skill } from '../models/skill';
import { map } from 'rxjs/operators';
import { mine, sortByDatetime } from './firestore-utils';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(
    private afFirestore: AngularFirestore,
    private afFunctions: AngularFireFunctions
  ) {}

  // 自分のスキルをすべて取得するか、特定の本に対して付与されたスキルをすべて取得する
  getSkills(uid: string, isbn?: string): Observable<Skill[]> {
    if (isbn === void 0) {
      return this.afFirestore.collection<Skill>('skills', mine).valueChanges();
    }

    return this.afFirestore
      .collection<Skill>('skills', ref => ref.where('isbn', '==', isbn))
      .valueChanges()
      .pipe(
        map(skills => {
          const filtered = skills.filter(skill => skill.uid === uid);
          sortByDatetime({ key: 'created', objects: filtered }, 'desc');
          return filtered;
        })
      );
  }

  deleteSkill = async (skill: Skill): Promise<void> =>
    this.afFunctions
      .httpsCallable('deleteSkill')({
        isbn: skill.isbn,
        content: skill.content,
        uid: skill.uid
      })
      .toPromise();
}
