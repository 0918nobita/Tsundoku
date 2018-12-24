import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../app/state/_state.interfaces';
import { Plan } from '../../app/models/plan';
import { getPlans } from '../../app/state/_state.selectors';
import { WatchPlan } from '../../app/state/plan/plan.action';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html'
})
export class ProgressPage {
  @ViewChild('plansCol', { read: ElementRef }) col: ElementRef;
  plans$: Observable<Plan[]>;
  matches = false;
  private mq: MediaQueryList;

  constructor(private store: Store<State>, private modalCtrl: ModalController) {
    this.store.dispatch(new WatchPlan());
    this.plans$ = this.store.pipe(select(getPlans));
  }

  ionViewDidLoad() {
    this.mq = window.matchMedia('(min-width: 1000px)');
    this.mq.addListener(event => {
      this.matches = event.matches;
    });
  }

  ionViewWillEnter() {
    this.matches = this.mq.matches;
  }
}
