import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'page-contact',
  templateUrl: 'achievement.html'
})
export class AchievementPage {
  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {
    firebase.auth().signOut();
  }
}
