import { Component, OnInit } from '@angular/core';
import {Customer} from "../models/customer";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";

import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {

  }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }



}
