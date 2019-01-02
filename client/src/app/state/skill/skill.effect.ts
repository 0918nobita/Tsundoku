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
import { AngularFirestore } from '@angular/fire/firestore';
import { Skill } from '../../../app/models/skill';
import { AuthEffects } from '../auth/auth.effect';
import { pickOnce } from '../book/book.effect';
import firebase from 'firebase/app';

@Injectable()
export class SkillEffects {
  constructor(
    private authEffects: AuthEffects,
    private actions$: Actions,
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
      const uid = await pickOnce(this.authEffects.forAuthenticated);
      const { docs } = await pickOnce(
        this.afFirestore
          .collection('skills', ref =>
            ref
              .where('isbn', '==', action.isbn)
              .where('content', '==', action.content)
          )
          .get()
      );
      if (docs.length !== 0) {
        throw new Error('すでに同じスキルが追加されています');
      }
      await this.afFirestore.collection('skills').add({
        uid,
        isbn: action.isbn,
        content: action.content,
        created: firebase.firestore.Timestamp.fromDate(new Date())
      });
      return new CreateSkillSuccess();
    }),
    catchError(e => of(new CreateSkillFail(e)))
  );

  @Effect()
  deleteSkill: Observable<Action> = this.actions$.pipe(
    ofType<DeleteSkill>(SkillActionTypes.DeleteSkill),
    concatMap(async action => {
      const { docs } = await pickOnce(
        this.afFirestore
          .collection('skills', ref =>
            ref
              .where('uid', '==', action.skill.uid)
              .where('isbn', '==', action.skill.isbn)
              .where('content', '==', action.skill.content)
          )
          .get()
      );
      if (docs.length === 0) throw new Error('スキル情報の取得に失敗しました');
      await this.afFirestore
        .collection('skills')
        .doc(docs[0].id)
        .delete();
      return new DeleteSkillSuccess();
    }),
    catchError(e => of(new DeleteSkillFail(e)))
  );
}
