import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Chart } from 'chart.js';

import { Plan } from '../../../app/models/plan';
import { Observable } from 'rxjs';
import { Skill } from '../../../app/models/skill';
import { SkillService } from '../../../app/services/skill.service';
import {
  AlertController,
  LoadingController,
  Loading,
  ToastController
} from 'ionic-angular';

@Component({
  selector: 'progress-card',
  templateUrl: 'progress-card.html'
})
export class ProgressCard {
  @Input() plan: Plan;
  @ViewChild('graph') graph: ElementRef;
  skills$: Observable<Skill[]>;
  conversion = false;
  loader: Loading;

  constructor(
    private skillService: SkillService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.loader = this.loadingCtrl.create({
      content: '追加処理中です…'
    });
  }

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

  addSkill() {
    this.alertCtrl
      .create({
        title: 'スキルの追加',
        inputs: [
          {
            name: 'content',
            placeholder: 'スキルの内容 (必須)'
          }
        ],
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel'
          },
          {
            text: '追加',
            handler: data => {
              this.loader.present();
              this.skillService
                .createSkill(this.plan.isbn, data.content)
                .then(() => {
                  this.loader.dismiss();
                })
                .catch(e => {
                  this.loader.dismiss();
                  this.toastCtrl
                    .create({
                      message: e,
                      duration: 5000
                    })
                    .present();
                });
            }
          }
        ]
      })
      .present();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === 229) this.conversion = true;
    else if (event.keyCode === 13) this.conversion = false;
  }
}
