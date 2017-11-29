import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './secure-layout.component.html',
  styleUrls: ['./secure-layout.component.css']
})
export class SecureLayoutComponent implements OnInit {
  bodyClass: any = '';

  constructor(private authenticationService: AuthService,  private router: Router) { }


  ngOnInit() {
    document.body.classList.remove('cyan');
  }

  logout()
  {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
