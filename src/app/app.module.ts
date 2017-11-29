import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersListComponent } from './users-list/users-list.component';
import {AuthGuard} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SecureLayoutComponent} from './_layout/secure-layout/secure-layout.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  // Site routes goes here
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    component: SecureLayoutComponent,
    children: [
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    UsersListComponent,
    SecureLayoutComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuard, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
