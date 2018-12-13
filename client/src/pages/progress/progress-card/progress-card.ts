import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { Plan } from '../../../app/models/plan';
import { Observable } from 'rxjs';
import { Skill } from '../../../app/models/skill';
import { SkillService } from '../../../app/services/skill.service';

@Component({
  selector: 'progress-card',
  templateUrl: 'progress-card.html'
})
export class ProgressCard {
  @Input() plan: Plan;
  @ViewChild('graph') graph: ElementRef;
  skills$: Observable<Skill[]>;

  constructor(private skillService: SkillService) {}

  ngAfterViewInit() {
    this.skills$ = this.skillService.getSkills(this.plan.uid, this.plan.isbn);

    const context = this.graph.nativeElement.getContext('2d');
    new Chart(context, {
      type: 'doughnut',
      data: {
        labels: ['読んだ', '読んでない'],
        datasets: [
          {
            label: 'progress',
            data: [
              this.plan.progress,
              this.plan.book.pageCount - this.plan.progress
            ],
            backgroundColor: ['#36A2EB', '#CECECE'],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          text: `${percentage(this.plan.progress, this.plan.book.pageCount)} %`,
          display: true
        },
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        animation: { animateScale: true }
      }
    });

    function percentage(samples: number, total: number) {
      return Math.round((samples / total) * 100 * 10) / 10;
    }
  }
}
