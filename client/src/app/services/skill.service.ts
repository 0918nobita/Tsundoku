import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Skill } from '../models/skill';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private afFirestore: AngularFirestore) {}

  // 自分のスキルをすべて取得するか、特定の本に対して付与されたスキルをすべて取得する
  getSkills = (uid: string, isbn?: string): Observable<Skill[]> =>
    this.afFirestore
      .collection<Skill>('skills', ref => ref.where('isbn', '==', isbn))
      .valueChanges()
      .pipe(map(skills => skills.filter(skill => skill.uid === uid)));
}
