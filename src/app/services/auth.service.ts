import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class AuthService{

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated || localStorage.getItem('loggedIn')) {
      this.setLoggedIn(true);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(username: string, password: string) {
   this.loggedIn = true;
    localStorage.setItem('loggedIn', '1');
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

  relogin() {
    if (localStorage.getItem('loggedIn')) {
      this.loggedIn = true;
    }

    return this.loggedIn;
  }

  logout() {
    this.router.navigate(['/']);
    this.setLoggedIn(false);
    localStorage.clear();
  }

  get authenticated() {

    return this.loggedIn;
  }


}
