import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { Plan } from '../../../app/models/plan';

@Component({
  selector: 'progress-card',
  templateUrl: 'progress-card.html'
})
export class ProgressCard {
  @Input() plan: Plan;
}
