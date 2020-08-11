import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import {UserService} from './user.service';
import { Observable,throwError} from "rxjs";
import {exhaustMap,catchError} from 'rxjs/operators';
import { Global } from "./Global";


@Injectable({
  providedIn: 'root'
})
export class TableService {
  public url: String;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url=Global.url;
   }

   getTableData(param:string):Observable<any>{
    return this._userService.user.pipe(
      
      exhaustMap(user=>{
        const params=new HttpParams().set('month',param);
        return this._http.get(`${this.url}get-tickets/${user.id}`,{params})
      }),catchError(this.handleError)
     
    );
   }

   private handleError(errorRes:HttpErrorResponse){
    let defaultMessage='An error has occurred';

    if(!errorRes.error || !errorRes.error.err){
      return throwError(defaultMessage);
    }

    if(errorRes.error.err.message){
      defaultMessage=errorRes.error.err.message;
      return throwError(defaultMessage); 

      }
    }
   

}
