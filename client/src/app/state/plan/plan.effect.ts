import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { concatMap, mergeMap, map, catchError, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  WatchPlan,
  UpdatePlan,
  PlanActionTypes,
  WatchPlanFail
} from './plan.action';
import { Plan } from '../../models/plan';
import { mine } from '../../services/firestore-utils';
import { State } from '../_state.interfaces';
import { GetBook } from '../book/book.action';
import { getBookDetail } from '../_state.selectors';

@Injectable()
export class PlanEffects {
  constructor(
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private store: Store<State>
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
              mergeMap(change => {
                this.store.dispatch(
                  new GetBook({ isbn: change.payload.doc.data().isbn })
                );
                return this.store.pipe(
                  select(getBookDetail),
                  take(1),
                  map(book =>
                    book !== null
                      ? new UpdatePlan({
                          id: change.payload.doc.id,
                          plan: { ...change.payload.doc.data(), book }
                        })
                      : new WatchPlanFail({
                          error: '本の情報の取得に失敗しました'
                        })
                  )
                );
              })
            )
          ),
          catchError(error => of(new WatchPlanFail({ error })))
        )
    )
  );
}
