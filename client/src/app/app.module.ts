import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import 'bootstrap';

import { environment } from '../environments/environment';

import { TopComponent } from './top/top.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProgressCardComponent } from './progress-card/progress-card.component';
import { NowLoadingComponent } from './now-loading/now-loading.component';
import { BackComponent } from './back/back.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

import { AccountService } from './services/account.service';
import { BookService } from './services/book.service';
import { DexieService } from './services/dexie.service';
import { NetworkService } from './services/network.service';
import { UserService } from './services/user.service';
import { RecordService } from './services/record.service';

import { AuthGuard } from './guard/auth.guard';

// ルーティングの設定
export const AppRoutes = [
    { path: '', component: TopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent, canActivate: [ AuthGuard ] },
    { path: 'bookshelf', component: BookshelfComponent, canActivate: [ AuthGuard ] },
    { path: 'bookDetails/:isbn', component: BookDetailsComponent, canActivate: [ AuthGuard ] },
    { path: 'profile/:name', component: ProfileComponent, canActivate: [ AuthGuard ] },
    { path: 'timeline', component: TimelineComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookshelfComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    BookDetailsComponent,
    BackComponent,
    TimelineComponent,
    TopComponent,
    NowLoadingComponent,
    ProgressCardComponent,
    StatusBarComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    // FirebaseService のインスタンスを、アプリ全体で共有されるサービスとして登録する
    NetworkService,
    DexieService,
    AccountService,
    BookService,
    UserService,
    BookService,
    RecordService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
