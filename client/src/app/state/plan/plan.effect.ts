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
  WatchPlanFail,
  UpdatePlan,
  UpdatePlanSuccess,
  UpdatePlanFail
} from './plan.action';
import { Plan } from '../../models/plan';
import { BookService } from '../../../app/services/book.service';
import { AuthEffects } from '../auth/auth.effect';
import { sortByDatetime } from '../../../app/services/firestore-utils';
import { pickOnce } from '../book/book.effect';

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
                sortByDatetime({ key: 'modified', objects: plans }, 'desc');
                return plans;
              }),
              map(plans => new ReloadPlan(plans))
            )
        )
      )
    ),
    catchError(e => of(new WatchPlanFail(e)))
  );

  @Effect()
  updatePlan: Observable<Action> = this.actions$.pipe(
    ofType<UpdatePlan>(PlanActionTypes.UpdatePlan),
    concatMap(async action => {
      const uid = await pickOnce(this.authEffects.forAuthenticated);
      const { docs } = await pickOnce(
        this.afFirestore
          .collection('plans', ref =>
            ref.where('uid', '==', uid).where('isbn', '==', action.payload.isbn)
          )
          .get()
      );
      if (docs.length === 0) {
        return new UpdatePlanFail('本の情報を取得できませんでした');
      }
      try {
        await this.afFirestore
          .collection<Plan>('plans')
          .doc(docs[0].id)
          .update({
            title: action.payload.title,
            desc: action.payload.desc,
            progress: action.payload.progress
          });
      } catch (e) {
        return new UpdatePlanFail(e);
      }
      return new UpdatePlanSuccess();
    })
  );
}
