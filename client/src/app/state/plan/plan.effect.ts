import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  WatchPlan,
  UpdatePlan,
  PlanActionTypes,
  WatchPlanFail
} from './plan.action';
import { Plan } from '../../models/plan';
import { mine } from '../../services/firestore-utils';
import { BookService } from '../../services/book.service';

@Injectable()
export class PlanEffects {
  constructor(
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private bookService: BookService
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
              mergeMap(change =>
                from(
                  this.bookService.getBookByISBN(change.payload.doc.data().isbn)
                ).pipe(
                  map(
                    book =>
                      new UpdatePlan({
                        id: change.payload.doc.id,
                        plan: { ...change.payload.doc.data(), book }
                      })
                  )
                )
              )
            )
          ),
          catchError(error => of(new WatchPlanFail({ error })))
        )
    )
  );
}
