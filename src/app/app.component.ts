import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'app';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) { }

  ngOnInit() {
    if (this.authenticationService.authenticated || this.authenticationService.relogin()) {
      this.router.navigate(['dashboard']);
      return;
    }


    this.router.navigate(['login']);
  }
}
