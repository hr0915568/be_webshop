import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Customer} from "../models/customer";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
@Injectable()
export class CustomerService {

  constructor(
    private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    console.log('getting customers...');
    const url = 'http://localhost:9000/admin/customers';
    return this.http.get<Customer[]>(url,  {withCredentials: true}).pipe(
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
