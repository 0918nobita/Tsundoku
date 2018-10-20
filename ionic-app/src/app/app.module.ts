import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SignUpPage } from '../pages/signup/signup';
import { SignUpPageModule } from '../pages/signup/signup.module';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { ProgressPage } from '../pages/progress/progress';
import { AchievementPage } from '../pages/achievement/achievement';
import { BookshelfPage } from '../pages/bookshelf/bookshelf';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { firebaseConfig } from './config';
import { DexieService } from './services/dexie.service';
import { BookService } from './services/book.service';
import { BookshelfService } from './services/bookshelf.service';

@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(),
    SignUpPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    SignUpPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DexieService,
    BookService,
    BookshelfService
  ]
})
export class AppModule {}
