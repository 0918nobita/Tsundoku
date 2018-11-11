import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../app/state/_state.interfaces';
import { Plan } from '../../app/models/plan';
import { getPlans } from '../../app/state/_state.selectors';
import { WatchPlan } from '../../app/state/plan.action';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans$: Observable<Plan[]>;

  constructor(private store: Store<State>) {
    this.store.dispatch(new WatchPlan());
    this.plans$ = this.store.select(getPlans);
  }
}
