import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../app/state/_state.interfaces';
import { Plan } from '../../app/models/plan';
import { getPlans } from '../../app/state/_state.selectors';
import { WatchPlan } from '../../app/state/plan/plan.action';
import { ModalController } from 'ionic-angular';
import { PlanAdditionModal } from './plan-addition-modal/plan-addition-modal';

@Component({
  selector: 'page-about',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  plans$: Observable<Plan[]>;

  constructor(private store: Store<State>, private modalCtrl: ModalController) {
    this.store.dispatch(new WatchPlan());
    this.plans$ = this.store.pipe(select(getPlans));
  }

  openPlanAdditionModal() {
    this.modalCtrl.create(PlanAdditionModal).present();
  }
}
