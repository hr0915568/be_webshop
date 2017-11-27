import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersListComponent } from './users-list/users-list.component';
import {AuthGuard} from './Services/auth-guard.service';
import {AuthService} from './Services/auth.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent , canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuard, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
