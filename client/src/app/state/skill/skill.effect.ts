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
  DeleteSkillFail
} from '../skill/skill.action';
import { concatMap, catchError } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class SkillEffects {
  constructor(
    private actions$: Actions,
    private afFunctions: AngularFireFunctions
  ) {}

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
