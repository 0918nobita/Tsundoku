import { Component, OnInit, Input } from '@angular/core';

import { Record } from 'shared/entity';
import { UserService } from '../services/user.service';
import { Progress } from 'shared/progress';

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css']
})
export class ProgressCardComponent implements OnInit {
  @Input() public record: Record;
  image: string;
  screenName: string;
  name: string;
  desc: string;
  isbn: string;
  range: string;
  created: string;

  constructor(private userService: UserService) {}

  async ngOnInit() {

    const convertDateTime = (timestamp) => {
      const pad = input => (input < 10) ? '0' + input : input;
      const date = timestamp ? new Date(timestamp * 1000) : new Date();
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ` +
          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    this.created = convertDateTime(this.record.created.seconds);
    this.desc = this.record.desc;
    this.isbn = this.record.isbn;

    try {
      const user = await this.userService.getUserByName(this.record.user);
      this.screenName = user.screenName;
      this.name = user.name;
      this.image = user.image;
      this.range =
          (new Progress(this.record.range.fragments)).toString()
              .replace(/-/g, '〜') + 'ページ';
    } catch (error) {
      console.error(error);
    }
  }
}
