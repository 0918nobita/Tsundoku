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
import { FirebaseService } from './firebase.service';
import { BookService } from './book.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import * as bootstrap from 'bootstrap';

// ルーティングの設定
export const AppRoutes = [
    { path: '', component: TopComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'search', component: SearchComponent },
    { path: 'bookshelf', component: BookshelfComponent },
    { path: 'bookDetails/:isbn', component: BookDetailsComponent },
    { path: 'userDetails/:name', component: UserDetailsComponent }
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
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
