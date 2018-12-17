import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CreateSkill,
  SkillActionTypes,
  CreateSkillSuccess,
  CreateSkillFail,
  DeleteSkill,
  DeleteSkillSuccess,
  DeleteSkillFail,
  WatchSkill,
  WatchSkillFail,
  UpdateSkill
} from '../skill/skill.action';
import { concatMap, catchError, map } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from '../../../app/models/skill';
import { AuthEffects } from '../auth/auth.effect';

@Injectable()
export class SkillEffects {
  constructor(
    private authEffects: AuthEffects,
    private actions$: Actions,
    private afFunctions: AngularFireFunctions,
    private afFirestore: AngularFirestore
  ) {}

  @Effect()
  watchSkill: Observable<Action> = this.actions$.pipe(
    ofType<WatchSkill>(SkillActionTypes.WatchSkill),
    concatMap(() =>
      this.authEffects.forAuthenticated.pipe(
        concatMap(uid =>
          this.afFirestore
            .collection<Skill>('skills', ref => ref.where('uid', '==', uid))
            .valueChanges()
            .pipe(map(skills => new UpdateSkill(skills)))
        )
      )
    ),
    catchError(e => of(new WatchSkillFail(e)))
  );

  @Effect()
  createSkill: Observable<Action> = this.actions$.pipe(
    ofType<CreateSkill>(SkillActionTypes.CreateSkill),
    concatMap(async action => {
      const id = await this.afFunctions
        .httpsCallable('createSkill')(action.payload)
        .toPromise();
      console.log(`Created skill's ID: ${id}`);
      return new CreateSkillSuccess();
    }),
    catchError(() => of(new CreateSkillFail()))
  );

  @Effect()
  deleteSkill: Observable<Action> = this.actions$.pipe(
    ofType<DeleteSkill>(SkillActionTypes.DeleteSkill),
    concatMap(async action => {
      await this.afFunctions
        .httpsCallable('deleteSkill')(action.payload.id)
        .toPromise();
      console.log(`Deleted skill's ID: ${action.payload.id}`);
      return new DeleteSkillSuccess();
    }),
    catchError(() => of(new DeleteSkillFail()))
  );
}
