import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Customer} from "../models/customer";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
@Injectable()
export class CustomerService {

  constructor(
    private http: HttpClient) {}


  saveCustomer(customer: Customer) {
    console.log(customer);
    const body = new HttpParams()
      .set('firstname', customer.firstname)
      .set('lastname', customer.lastname)
      .set('email', customer.email)
      .set('password', customer.password);

    return this.http.post('http://api.hrwebshop.tk/admin/customers/' + customer.id, body.toString(),
      {
        responseType: 'text',
        withCredentials: true,
        headers: new HttpHeaders()
          .set('Content-type', 'application/x-www-form-urlencoded')
      }
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = 'http://api.hrwebshop.tk/admin/customers/' + id;
    return this.http.get<Customer>(url,  {
        withCredentials: true,
        headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

      }).pipe(
        tap(customer => console.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', new Customer()))
    );
  }

  getCustomers(): Observable<Customer[]> {
    console.log('getting customers...');
    const url = 'http://api.hrwebshop.tk/admin/customers';
    return this.http.get<Customer[]>(url,  {
      withCredentials: true,
      headers: new HttpHeaders()
        .set('Content-type', 'text/plain')

    }).pipe(
      tap(customers => console.log(`fetched heroes`)),
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
