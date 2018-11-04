import { Component } from '@angular/core';

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

  constructor(private planService: PlanService) {}

  ionViewWillEnter() {
    this.planService.getPlans().subscribe(plan => {
      updateDynamicList(this.plans, plan);
      sortByDatetime({ key: 'modified', objects: this.plans }, 'desc');
    });
  }
}
