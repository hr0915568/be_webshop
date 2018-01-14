import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {ProductView} from '../models/product-view';
import 'rxjs/add/operator/switchMap';
import {CategoryView} from '../models/category-view';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public lineChartData:Array<any> = [
    {data: [], label: 'product views'},
  ];

  public lineChartLabels:Array<any> = [];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public lineChartOptions:any = {
    responsive: true
  };



  public radarChartLabels:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  public radarChartData:any = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Batteries'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Lights'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Tires'},
     {data: [0, 0, 0, 0, 0, 0, 0], label: 'Wheels'},
     {data: [0, 0, 0, 0, 0, 0, 0], label: 'Lights'},
     {data: [0, 0, 0, 0, 0, 0, 0], label: 'Wipers'}
  ];
  public radarChartType:string = 'radar';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProductViewsData().subscribe( data => {
      for (var i = 0; i < data.length; i++) {
        var p: ProductView = data[i];
        this.lineChartData[0].data.push(p.count);
        this.lineChartLabels.push(p.date);
      }

      console.log(this.lineChartData);
    });


    this.getCategoryViewsData().subscribe(
      data => {
        for (var i = 0; i < data.length; i++) {
          var p: CategoryView = data[i];

          for (var j = 0; j < this.radarChartData.length; j++) {
            if(this.radarChartData[j].label === p.categoryName) {

              var index: any = p.dayofweek - 1;
              this.radarChartData[j].data[index] = p.count;

            }
          }
        }
        console.log(this.radarChartData);
      }
    );
  }

  getProductViewsData(): Observable<ProductView[]> {
    const url = 'http://api.hrwebshop.tk/admin/data/productviews';
    return this.http.get<ProductView[]>(url,  {
      withCredentials: true,
      headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

    }).pipe(
      tap(products => console.log(`fetched data`)),
    );
  }


  getCategoryViewsData(): Observable<CategoryView[]> {
    const url = 'http://api.hrwebshop.tk/admin/data/categoryviews';
    return this.http.get<CategoryView[]>(url,  {
      withCredentials: true,
      headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

    }).pipe(
      tap(products => console.log(`fetched data`)),
    );
  }
}
