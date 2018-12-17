import { Component } from '@angular/core';
import moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { SkillService } from '../../app/services/skill.service';
import { Skill } from 'shared/entity';
import {
  sortByDatetime,
  updateDynamicList
} from '../../app/services/firestore-utils';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: 'achievement.html'
})
export class AchievementPage {
  skills: Skill[] = [];

  constructor(private skillService: SkillService) {
    moment.locale('ja');
  }

  ionViewWillEnter() {
    this.skillService
      .getSkills((firebase.auth().currentUser as firebase.User).uid)
      .pipe(flatMap(skills => from(skills)))
      .subscribe(skill => {
        updateDynamicList(this.skills, skill);
        sortByDatetime({ key: 'created', objects: this.skills }, 'desc');
      });
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }
}
