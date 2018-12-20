import { Component, HostListener } from '@angular/core';
import {
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { FundamentalModal } from '../../../../pages/fundamental-modal';
import { SkillService } from '../../../../app/services/skill.service';
import { Observable } from 'rxjs';
import { Skill } from '../../../../app/models/skill';
import { Plan } from '../../../../app/models/plan';
import { State } from '../../../../app/state/_state.interfaces';
import { Store, select } from '@ngrx/store';
import {
  DeleteSkill,
  CreateSkill
} from '../../../../app/state/skill/skill.action';
import { getSkillProgress } from '../../../../app/state/_state.selectors';

@Component({
  templateUrl: 'skill-control-modal.html'
})
export class SkillControlModal extends FundamentalModal {
  plan: Plan;
  skills$: Observable<Skill[]>;
  private conversion = false;

  constructor(
    protected viewCtrl: ViewController,
    protected toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    private skillService: SkillService,
    private store: Store<State>
  ) {
    super(viewCtrl, toastCtrl);
    this.plan = this.navParams.get('plan');
  }

  ionViewDidLoad() {
    this.skills$ = this.skillService.getSkills(this.plan.uid, this.plan.isbn);
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
    this.loading('追加処理中です…');
  }

  async deleteSkill(skill: Skill) {
    this.store.dispatch(new DeleteSkill(skill));
    this.loading('削除処理中です…');
  }

  private loading(content: string) {
    const loader = this.loadingCtrl.create({ content });
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
