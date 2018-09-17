import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

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
  image: string;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService) {}

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params['name'];
    if (this.accountService.currentUser === null) return;
    this.image = this.accountService.image;
    this.screenName = this.accountService.screenName;
    console.log([this.image, this.screenName]);
  }
}
