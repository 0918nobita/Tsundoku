import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PlanState } from '../../app/state/_state.interfaces';
import { Plan } from '../../app/models/plan';
import { getPlans } from '../../app/state/_state.selectors';

import { DetailedPlan, PlanService } from '../../app/services/plan.service';
import {
  sortByDatetime,
  updateDynamicList
} from '../../app/services/firestore.service';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans: DetailedPlan[] = [];
  plans$: Observable<Plan[]>;

  constructor(private planService: PlanService, private store: Store<PlanState>) {
    this.plans$ = store.select(getPlans);
    this.plans$.subscribe(plan => console.log(plan));
  }

  ionViewWillEnter() {
    this.planService.getPlans().subscribe(plan => {
      updateDynamicList(this.plans, plan);
      sortByDatetime({ key: 'modified', objects: this.plans }, 'desc');
    });
  }
}
