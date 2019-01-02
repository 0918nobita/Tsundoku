import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { Plan } from '../../../app/models/plan';
import { SkillControlModal } from './skill-control-modal/skill-control-modal';
import { ModalController } from 'ionic-angular';
import { PlanControlModal } from './plan-control-modal/plan-control-modal';

@Component({
  selector: 'progress-card',
  templateUrl: 'progress-card.html'
})
export class ProgressCard {
  @Input() plan: Plan;
  @ViewChild('graph') graph: ElementRef;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
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
        maintainAspectRatio: false
      }
    });

    function percentage(samples: number, total: number) {
      return Math.round((samples / total) * 100 * 10) / 10;
    }
  }

  openSkillControlModal(plan: Plan) {
    this.modalCtrl.create(SkillControlModal, { plan }).present();
  }

  openPlanControlModal(plan: Plan) {
    this.modalCtrl.create(PlanControlModal, { plan }).present();
  }
}
