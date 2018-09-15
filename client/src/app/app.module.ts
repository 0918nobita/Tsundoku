import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { BookComponent } from './book/book.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { TopComponent } from './top/top.component';
import { FirebaseService } from './services/firebase.service';
import { DexieService } from './services/dexie.service';
import { AccountService } from './services/account.service';
import { BookService } from './services/book.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import * as bootstrap from 'bootstrap';
import { BackComponent } from './back/back.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TwistampComponent } from './twistamp/twistamp.component';

// ルーティングの設定
export const AppRoutes = [
    { path: '', component: TopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'bookshelf', component: BookshelfComponent },
    { path: 'bookDetails/:isbn', component: BookDetailsComponent },
    { path: 'userDetails/:name', component: UserDetailsComponent },
    { path: 'twistamp', component: TwistampComponent }
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
    UserDetailsComponent,
    BackComponent,
    TimelineComponent,
    TwistampComponent,
    TopComponent
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
