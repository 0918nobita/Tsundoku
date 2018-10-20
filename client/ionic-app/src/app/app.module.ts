import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SignUpPage } from '../pages/signup/signup';
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
    TabsPage,
    SignUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage
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
