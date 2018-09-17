import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

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
import { NowLoadingComponent } from './now-loading/now-loading.component'
import { BackComponent } from './back/back.component';

import { AccountService } from './services/account.service';
import { BookService } from './services/book.service';
import { DexieService } from './services/dexie.service';
import { FirebaseService } from './services/firebase.service';

// ルーティングの設定
export const AppRoutes = [
    { path: '', component: TopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'bookshelf', component: BookshelfComponent },
    { path: 'bookDetails/:isbn', component: BookDetailsComponent },
    { path: 'profile/:name', component: ProfileComponent }
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
    ProgressCardComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    // FirebaseService のインスタンスを、アプリ全体で共有されるサービスとして登録する
    FirebaseService,
    DexieService,
    AccountService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
