import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage), NgxGistModule]
})
export class LoginPageModule {}
