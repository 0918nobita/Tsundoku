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
import { AlertController, LoadingController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { State } from '../../../app/state/_state.interfaces';
import {
  CreateSkill,
  DeleteSkill
} from '../../../app/state/skill/skill.action';
import { getSkillProgress } from '../../../app/state/_state.selectors';

@Component({
  selector: 'progress-card',
  templateUrl: 'progress-card.html'
})
export class ProgressCard {
  @Input() plan: Plan;
  @ViewChild('graph') graph: ElementRef;
  skills$: Observable<Skill[]>;
  conversion = false;

  constructor(
    private skillService: SkillService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private store: Store<State>
  ) {}

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

  createSkillListener() {
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
              if (this.conversion) {
                this.conversion = false;
                return false;
              }
              this.createSkill(data.content);
            }
          }
        ]
      })
      .present();
  }

  async createSkill(content: string) {
    this.store.dispatch(new CreateSkill(this.plan.isbn, content));
    const loader = this.loadingCtrl.create({ content: '追加処理中です…' });
    loader.present();
    this.store.pipe(select(getSkillProgress)).subscribe(progress => {
      if (progress === 'complete') loader.dismiss();
    });
  }

  async deleteSkill(skill: Skill) {
    this.store.dispatch(new DeleteSkill(skill));
    const loader = this.loadingCtrl.create({ content: '削除処理中です…' });
    loader.present();
    this.store.pipe(select(getSkillProgress)).subscribe(progress => {
      if (progress === 'complete') loader.dismiss();
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    /* tslint:disable:deprecation */
    if (event.keyCode === 229) this.conversion = true;
    else if (event.keyCode === 13) this.conversion = false;
  }
}
