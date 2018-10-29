import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { Skill } from '../../../../shared/entity';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private afFirestore: AngularFirestore) {}

  getSkills(uid: string): Observable<Skill> {
    return this.afFirestore
      .collection<Skill>('skills', ref => ref.where('uid', '==', uid))
      .valueChanges()
      .pipe(flatMap(skills => from(skills)));
  }
}
