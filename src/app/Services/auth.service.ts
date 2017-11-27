import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
   this.loggedIn = true;
  }

  handleAuth() {
  }


  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setLoggedIn(true);
  }

  logout() {
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return false;
  }

}
