import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { ProgressPage } from '../pages/progress/progress';
import { AchievementPage } from '../pages/achievement/achievement';
import { BookshelfPage } from '../pages/bookshelf/bookshelf';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from './config';
import { BookDetailsModal } from '../pages/book-details-modal/book-details-modal';
import { Book } from '../pages/book/book';
import { SplitPane } from '../pages/split-pane/split-pane';
import { SettingsButton } from '../pages/settings-button/settings-button';
import { SettingsModal } from '../pages/settings-button/settings-modal/settings-modal';
import { SearchPage } from '../pages/bookshelf/search-page/search-page';
import { ProgressCard } from '../pages/progress/progress-card/progress-card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './state/_state.reducers';
import { PlanEffects } from './state/plan/plan.effect';
import { AuthEffects } from './state/auth/auth.effect';
import { BookshelfEffects } from './state/bookshelf/bookshelf.effect';
import { SkillEffects } from './state/skill/skill.effect';
import { BookEffects } from './state/book/book.effect';
import { SkillControlModal } from '../pages/progress/progress-card/skill-control-modal/skill-control-modal';
import { PlanControlModal } from '../pages/progress/progress-card/plan-control-modal/plan-control-modal';
import { BooksBySkillModal } from '../pages/bookshelf/search-page/books-by-skill-modal/books-by-skill-modal';

import { NgxGistModule } from 'ngx-gist/dist/ngx-gist.module';

@NgModule({
  declarations: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    BookDetailsModal,
    Book,
    SplitPane,
    SettingsButton,
    SettingsModal,
    SearchPage,
    ProgressCard,
    SkillControlModal,
    PlanControlModal,
    BooksBySkillModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '戻る'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule.enablePersistence(),
    LoginPageModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      BookEffects,
      BookshelfEffects,
      PlanEffects,
      AuthEffects,
      SkillEffects
    ]),
    NgxGistModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressPage,
    AchievementPage,
    BookshelfPage,
    TabsPage,
    LoginPage,
    BookDetailsModal,
    SplitPane,
    SettingsButton,
    SettingsModal,
    SearchPage,
    ProgressCard,
    SkillControlModal,
    PlanControlModal,
    BooksBySkillModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
