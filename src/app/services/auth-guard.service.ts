import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    // If the user is not logged in we'll send them back to the home page
    return new Promise((resolve) => {
      if (!this.auth.authenticated) {
        this.router.navigate(['login']);
        resolve(false);
      }
      resolve(true);
    });

  }

}
