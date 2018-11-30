import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WatchBookshelf, BookshelfActionTypes } from './bookshelf.action';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BookshelfEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  watchBookshelf: Observable<Action> = this.actions$.pipe(
    ofType<WatchBookshelf>(BookshelfActionTypes.WatchBookshelf),
    tap(x => console.log(`watchBookshelf: ${x}`))
  );
}
