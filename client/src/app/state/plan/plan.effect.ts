import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { concatMap, mergeMap, map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  WatchPlan,
  UpdatePlan,
  PlanActionTypes,
  WatchPlanFail
} from './plan.action';
import { Plan } from '../../models/plan';
import { BookService } from '../../../app/services/book.service';
import { State } from '../_state.interfaces';
import { getUser } from '../_state.selectors';

@Injectable()
export class PlanEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private afFirestore: AngularFirestore,
    private bookService: BookService
  ) {}

  @Effect()
  watchPlan: Observable<Action> = this.actions$.pipe(
    ofType<WatchPlan>(PlanActionTypes.WatchPlan),
    concatMap(() =>
      this.store.pipe(
        select(getUser),
        map(me => {
          if (me === null || me === void 0) {
            throw new Error('ユーザー情報の取得に失敗しました');
          }
          return me;
        }),
        mergeMap(me =>
          this.afFirestore
            .collection<Plan>('plans', ref => ref.where('uid', '==', me.uid))
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
