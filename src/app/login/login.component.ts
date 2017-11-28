import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    ) { }

  ngOnInit() {
    this.returnUrl = '/';
    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authenticationService.login(this.model.username, this.model.password);
    this.router.navigate([this.returnUrl]);
  }

}
