import { Component, ViewChild, ElementRef } from '@angular/core';
import moment from 'moment';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Skill } from '../../app/models/skill';
import { getSkills } from '../../app/state/_state.selectors';
import { State } from '../../app/state/_state.interfaces';
import { WatchSkill } from '../../app/state/skill/skill.action';

@Component({
  templateUrl: 'achievement.html'
})
export class AchievementPage {
  @ViewChild('graph') graph: ElementRef;
  skills$: Observable<Skill[]>;
  labels: string[] = [];
  data: number[] = [];

  constructor(private store: Store<State>) {}

  ngAfterViewInit() {
    this.updateChart();
  }

  ionViewDidLoad() {
    this.store.dispatch(new WatchSkill());
    this.skills$ = this.store.pipe(
      select(getSkills),
      map(skills => {
        this.labels = [];
        this.data = [];
        let sum = 0;
        const dateWithSum = {};
        const labelsOrder: string[] = [];

        for (let i = skills.length - 1; i >= 0; i--) {
          sum++;
          const date = skills[i].created.toDate();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const key = `${year}/${month}`;
          dateWithSum[key] = sum;

          if (
            labelsOrder.length === 0 ||
            labelsOrder[labelsOrder.length - 1] !== key
          ) {
            labelsOrder.push(key);
          }
        }

        this.data.push(0);
        this.labels.push('');
        for (const label of labelsOrder) {
          this.data.push(dateWithSum[label]);
          this.labels.push(label);
        }

        this.updateChart();
        return skills;
      })
    );
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }

  updateChart() {
    if (this.labels.length === 0) return;
    const context = this.graph.nativeElement.getContext('2d');
    new Chart(context, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'スキル数',
            data: this.data,
            fill: false,
            borderColor: '#488aff'
          }
        ]
      },
      options: {}
    });
  }
}
