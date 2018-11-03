import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { ProgressPage } from '../pages/progress/progress';
import { AchievementPage } from '../pages/achievement/achievement';
import { BookshelfPage } from '../pages/bookshelf/bookshelf';
import { SearchByIsbnModal } from '../pages/bookshelf/search-by-isbn-modal/search-by-isbn-modal';
import { SearchBySkillModal } from '../pages/bookshelf/search-by-skill-modal/search-by-skill-modal';
import { BookCreationModal } from '../pages/bookshelf/book-creation-modal/book-creation-modal';
import { TabsPage } from '../pages/tabs/tabs';

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
import { AuthService } from './services/auth.service';
import { BookDetailsModal } from '../pages/book-details-modal/book-details-modal';
import { PlanService } from './services/plan.service';
import { SkillService } from './services/skill.service';
import { Book } from '../pages/book/book';
import { SplitPane } from '../pages/split-pane/split-pane';
import { SettingsButton } from '../pages/settings-button/settings-button';

@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    SearchByIsbnModal,
    SearchBySkillModal,
    BookCreationModal,
    BookDetailsModal,
    Book,
    SplitPane,
    SettingsButton
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(),
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    LoginPage,
    SearchByIsbnModal,
    SearchBySkillModal,
    BookCreationModal,
    BookDetailsModal,
    SplitPane,
    SettingsButton
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DexieService,
    BookService,
    BookshelfService,
    AuthService,
    PlanService,
    SkillService
  ]
})
export class AppModule {}
