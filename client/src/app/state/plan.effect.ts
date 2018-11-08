import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  WatchPlan,
  WatchPlanFail,
  UpdatePlan,
  PlanActionTypes
} from './plan.action';
import { Plan } from '../models/plan';
import { mine } from '../services/firestore.service';

@Injectable()
export class PlanEffects {
  constructor(
    private actions$: Actions,
    private afFirestore: AngularFirestore
  ) {}

  @Effect()
  watchPlan: Observable<Action> = this.actions$.pipe(
    ofType<WatchPlan>(PlanActionTypes.WatchPlan),
    concatMap(() =>
      this.afFirestore
        .collection<Plan>('plans', mine)
        .snapshotChanges()
        .pipe(
          mergeMap(changes =>
            from(changes).pipe(
              map(
                change =>
                  new UpdatePlan({
                    id: change.payload.doc.id,
                    plan: change.payload.doc.data()
                  })
              )
            )
          ),
          catchError(err => of(new WatchPlanFail({ error: err })))
        )
    )
  );
}
