import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
@Injectable()
export class productprice{

constructor(private http:HttpClient){}

getprod(productid): Observable<any> {
 return this.http.get("http://localhost:3005/pro/"+productid);
}

getprodlst(): Observable<any> {
    return this.http.get("http://localhost:3005/productlst/");
}

}