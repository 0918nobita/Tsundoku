import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'shared/entity';
import { FirebaseService } from '../services/firebase.service';

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
              private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.name = this.activatedRoute.snapshot.params['name'];

    const getUserByName = (name: string): Promise<User> =>
      this.firebaseService.functions.httpsCallable('getUsersByName')(name)
        .then(result => {
          if (result.data.length > 0) {
            return <User> result.data[0];
          } else {
            return null;
          }
        })
        .catch(error => {
          console.log(error);
          return null;
        });

    try {
      const user = await getUserByName(this.name);
      this.screenName = user.screenName;
      this.bio = user.bio;
      this.image = user.image;
    } catch(error) {
      console.log(error);
    }
  }
}
