import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Product} from "../models/product";
@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log('getting customers...');
    const url = 'http://api.hrwebshop.tk/admin/products';
    return this.http.get<Product[]>(url,  {
      withCredentials: true,
      headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

    }).pipe(
      tap(products => console.log(`fetched products`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
