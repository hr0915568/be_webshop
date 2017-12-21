import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Customer} from '../models/customer';
import {Product} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = new Product();
  categories: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap
    // (+) converts string 'id' to a number
      .switchMap((params: ParamMap) => this.productService.getProductsById(+params.get('id')))
      .subscribe((product) => {
        this.product = product;
      });
    this.loadCategories();
  }

  save() {

    this.productService.saveProduct(this.product).subscribe(
      data => {
        this.router.navigate(['products']);
      },
      error => {
        console.log(error);
      });

  }

  private loadCategories() {
    const url = 'http://api.hrwebshop.tk/admin/categories';
    this.http.get<any>(url,  {
      withCredentials: true,
      headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

    }).subscribe((categories) => this.categories = categories);
  }

}
