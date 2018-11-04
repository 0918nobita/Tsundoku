import { Component } from '@angular/core';

import { DetailedPlan, PlanService } from '../../app/services/plan.service';
import { sortByDatetime } from '../../app/services/firestore.service';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans: DetailedPlan[] = [];

  constructor(private planService: PlanService) {}

  ionViewWillEnter() {
    this.planService.getPlans().subscribe(plan => {
      const index = this.plans
        .map(item => item.modified.toMillis())
        .indexOf(plan.modified.toMillis());
      if (index !== -1) this.plans.splice(index, 1);
      this.plans.push(plan);
      sortByDatetime({ key: 'modified', objects: this.plans }, 'desc');
    });
  }
}
