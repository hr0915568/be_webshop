import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {RequestOptions} from "@angular/http";

@Injectable()
export class AuthService {

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router, private http: HttpClient) {
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

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('http://localhost:9000/admin/login', body.toString(),
      {
        responseType: 'text',
        headers: new HttpHeaders()
          .set('Content-type', 'application/x-www-form-urlencoded')
      }
      )
      .map((response: Response) => {
        localStorage.setItem('loggedIn', '1');
        this.loggedIn = true;
      });

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
    localStorage.clear();
    console.log('cleared');
    this.setLoggedIn(false);
  }

  get authenticated() {

    return this.loggedIn;
  }


}
