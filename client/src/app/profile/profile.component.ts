import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { UserService } from '../services/user.service';

/**
 * プロフィール画面
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  screenName: string;
  bio: string;
  image: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {}

  async ngOnInit() {
    const nameParam = this.activatedRoute.snapshot.params['name'];

    try {
      const user = await this.userService.getUserByName(nameParam);
      $('app-now-loading').hide();
      this.name = user.name;
      this.screenName = user.screenName;
      this.bio = user.bio;
      this.image = user.image;
    } catch (error) {
      console.error(error);
    }
  }
}
