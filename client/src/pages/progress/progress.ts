import { Component } from '@angular/core';

import { DetailedPlan, PlanService } from '../../app/services/plan.service';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans: DetailedPlan[] = [];

  constructor(private planService: PlanService) {}

  ionViewWillEnter() {
    this.planService.getPlans().subscribe(plan => {
      if (
        this.plans.filter(
          item => item.modified.toMillis() === plan.modified.toMillis()
        ).length === 0
      )
        this.plans.push(plan);
    });
  }
}
