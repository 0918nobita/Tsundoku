import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { SignUpPage } from "../pages/sign-up/sign-up";
import { SignUpPageModule } from "../pages/sign-up/sign-up.module";
import { ProgressPage } from '../pages/progress/progress';
import { AchievementPage } from '../pages/achievement/achievement';
import { BookshelfPage } from '../pages/bookshelf/bookshelf';
import { TabsPage } from '../pages/tabs/tabs';
import { CallbackPage } from '../pages/callback/callback';
import { CallbackModule } from '../pages/callback/callback.module';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from './config';
import { DexieService } from './services/dexie.service';
import { BookService } from './services/book.service';
import { BookshelfService } from './services/bookshelf.service';
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [MyApp, ProgressPage, AchievementPage, BookshelfPage, TabsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(
      MyApp,
      {},
      {
        links: [
          {
            component: CallbackPage,
            name: 'callback',
            segment: 'callback'
          }
        ]
      }
    ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(),
    LoginPageModule,
    SignUpPageModule,
    CallbackModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    LoginPage,
    SignUpPage,
    CallbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DexieService,
    BookService,
    BookshelfService,
    AuthService
  ]
})
export class AppModule {}
