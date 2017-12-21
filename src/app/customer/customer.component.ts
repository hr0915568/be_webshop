import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() customer: Customer = new Customer();

  constructor( private route: ActivatedRoute,
               private router: Router,
               private customerService: CustomerService
               ) { }

  ngOnInit() {
    this.route.paramMap
    // (+) converts string 'id' to a number
      .switchMap((params: ParamMap) => this.customerService.getCustomerById(+params.get('id')))
      .subscribe((customer) => this.customer = customer);
  }

  save() {
    console.log(this.customer);
    this.customerService.saveCustomer(this.customer).subscribe(
      data => {
        this.router.navigate(['customers']);
      },
      error => {
        console.log(error);
      });

  }

}
