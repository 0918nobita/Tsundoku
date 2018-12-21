import { Component, ViewChild, ElementRef } from '@angular/core';
import moment from 'moment';
import { Chart } from 'chart.js';

import { Skill } from '../../app/models/skill';
import { Store, select } from '@ngrx/store';
import { getSkills } from '../../app/state/_state.selectors';
import { State } from '../../app/state/_state.interfaces';
import { Observable } from 'rxjs';
import { WatchSkill } from '../../app/state/skill/skill.action';

@Component({
  templateUrl: 'achievement.html'
})
export class AchievementPage {
  @ViewChild('graph') graph: ElementRef;
  skills$: Observable<Skill[]>;

  constructor(private store: Store<State>) {}

  ngAfterViewInit() {
    const context = this.graph.nativeElement.getContext('2d');
    new Chart(context, {
      type: 'line',
      data: {
        labels: ['a', 'b', 'c', 'd'],
        datasets: [
          {
            label: 'スキル数',
            data: [0, 20, 40, 80],
            fill: false,
            borderColor: '#488aff'
          }
        ]
      },
      options: {}
    });
  }

  ionViewDidLoad() {
    this.store.dispatch(new WatchSkill());
    this.skills$ = this.store.pipe(select(getSkills));
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }
}
