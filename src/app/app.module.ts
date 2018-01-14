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
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoicesComponent } from './invoices/invoices.component';
import {CustomerService} from "./services/customer.service";
import {ProductService} from "./services/product.service";
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import {MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StatsComponent } from './stats/stats.component';
import {ChartsModule} from 'ng2-charts';

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
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'customer/:id', component: CustomerComponent, canActivate: [AuthGuard] },
      { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
      { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
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
    SiteLayoutComponent,
    DashboardComponent,
    CustomersComponent,
    ProductsComponent,
    OrdersComponent,
    InvoicesComponent,
    CustomerComponent,
    ProductComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuard, AuthService, CustomerService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
