import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  input: {
    email: string;
    password: string;
    name: string;
  } = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth
  ) {}

  async signUp() {
    try {
      const user = (await this.afAuth.auth.createUserWithEmailAndPassword(
        this.input.email, this.input.password)).user;
      await user.updateProfile({ displayName: this.input.name, photoURL: '' });
      await Promise.all([
        this.goBack(),
        this.toastCtrl.create({
          message: `${user.displayName} さんを登録しました`,
          duration: 3000
        }).present()
      ]);
    } catch (error) {
      await this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }

  async goBack() {
    await this.navCtrl.pop();
  }
}
