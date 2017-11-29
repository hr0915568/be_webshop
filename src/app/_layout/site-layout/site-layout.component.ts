import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  bodyClass: any = 'cyan';

  constructor() { }

  ngOnInit() {
    document.body.classList.add('cyan');
  }

}
