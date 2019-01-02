import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  WatchPlan,
  ReloadPlan,
  PlanActionTypes,
  WatchPlanFail
} from './plan.action';
import { Plan } from '../../models/plan';
import { BookService } from '../../../app/services/book.service';
import { AuthEffects } from '../auth/auth.effect';

@Injectable()
export class PlanEffects {
  constructor(
    private authEffects: AuthEffects,
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  @Effect()
  watchPlan: Observable<Action> = this.actions$.pipe(
    ofType<WatchPlan>(PlanActionTypes.WatchPlan),
    concatMap(() =>
      this.authEffects.forAuthenticated.pipe(
        mergeMap(uid =>
          this.afFirestore
            .collection<Plan>('plans', ref => ref.where('uid', '==', uid))
            .snapshotChanges()
            .pipe(
              mergeMap(async changes => {
                const plans: Plan[] = [];
                for (const change of changes) {
                  const book = await this.bookService.getBookByISBN(
                    change.payload.doc.data().isbn
                  );
                  if (book !== null) {
                    plans.push({
                      ...change.payload.doc.data(),
                      book
                    });
                  } else {
                    throw new Error('本の情報の取得に失敗しました');
                  }
                }
                return plans;
              }),
              map(plans => new UpdatePlan(plans))
            )
        )
      )
    ),
    catchError(e => of(new WatchPlanFail(e)))
  );
}
