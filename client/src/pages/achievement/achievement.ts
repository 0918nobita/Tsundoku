import { Component } from '@angular/core';
import moment from 'moment';

import { SkillService } from '../../app/services/skill.service';
import { Skill } from 'shared/entity';
import {
  sortByDatetime,
  updateDynamicList
} from '../../app/services/firestore-utils';

@Component({
  selector: 'page-contact',
  templateUrl: 'achievement.html'
})
export class AchievementPage {
  skills: Skill[] = [];

  constructor(private skillService: SkillService) {
    moment.locale('ja');
  }

  ionViewWillEnter() {
    this.skillService.getSkills().subscribe(skill => {
      updateDynamicList(this.skills, skill);
      sortByDatetime({ key: 'created', objects: this.skills }, 'desc');
    });
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }
}
