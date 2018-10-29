import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailedPlan, PlanService } from '../../app/services/plan.service';
import * as firebase from 'firebase';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans: DetailedPlan[] = [];

  constructor(
    public navCtrl: NavController,
    private planService: PlanService
  ) {}

  ionViewWillEnter() {
    this.planService
      .getPlans(firebase.auth().currentUser.uid)
      .subscribe(plan => {
        if (
          this.plans.filter(
            item => item.modified.toMillis() === plan.modified.toMillis()
          ).length === 0
        )
          this.plans.push(plan);
      });
  }
}
