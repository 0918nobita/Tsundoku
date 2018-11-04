import { Component } from '@angular/core';
import moment from 'moment';

import { SkillService } from '../../app/services/skill.service';
import { Skill } from 'shared/entity';

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
      const index = this.skills
        .map(item => item.created.toMillis())
        .indexOf(skill.created.toMillis());
      if (index !== -1) this.skills.splice(index, 1);
      this.skills.push(skill);
    });
  }

  differenceTime(time: Date) {
    return moment(time).fromNow();
  }
}
