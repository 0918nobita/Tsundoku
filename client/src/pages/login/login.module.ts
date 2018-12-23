import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { GistModule } from '@sgbj/angular-gist';

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage), GistModule]
})
export class LoginPageModule {}
