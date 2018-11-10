import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { flatMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

import { Skill } from 'shared/entity';
import { mine } from './firestore-utils';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private afFirestore: AngularFirestore) {}

  getSkills(): Observable<Skill> {
    return this.afFirestore
      .collection<Skill>('skills', mine)
      .valueChanges()
      .pipe(flatMap(skills => from(skills)));
  }
}
