import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CreateSkill,
  SkillActionTypes,
  CreateSkillSuccess,
  CreateSkillFail
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
      console.log(`Created Skill's ID: ${id}`);
      return new CreateSkillSuccess();
    }),
    catchError(() => of(new CreateSkillFail()))
  );
}
