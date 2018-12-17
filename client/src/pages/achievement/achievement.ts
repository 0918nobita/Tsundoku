import { Component } from '@angular/core';
import moment from 'moment';

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
  skills$: Observable<Skill[]>;

  constructor(private store: Store<State>) {}

  ionViewDidLoad() {
    this.store.dispatch(new WatchSkill());
    this.skills$ = this.store.pipe(select(getSkills));
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }
}
