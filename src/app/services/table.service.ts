import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import {UserService} from './user.service';
import { Observable,throwError} from "rxjs";
import {exhaustMap,catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  public url: String;

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url=environment.url;
   }

   saveIncome( concept:string, amount:number, month:string ):Observable<any>{
     return this._userService.user.pipe(
      exhaustMap(user=>{
        const body = {
          concept,
          amount,
          month,
          user:user.id
        }

        return this._http.post(`${this.url}save-income`, body)
      })
     )
   }

   getIncomeArray ( param: string ):Observable<any> {
      const params = new HttpParams().set('month',param);
      return this._http.get(`${this.url}get-income`, {params})
   }

   deleteIncome(id:string):Observable<any>{
    return this._http.delete(`${this.url}delete-income/${id}`)
   }

   getTableData ( param:string ):Observable<any> {
      return this._userService.user.pipe(
      
      exhaustMap(user=>{
        const params=new HttpParams().set('month',param);
        //const income = this._http.get(`${this.url}get-income`, {params})
        return this._http.get(`${this.url}get-tickets/${user.id}`,{params})

        
      }),catchError(this.handleError)
     
    );
   }

  getAccumulatedProductsAmounts( concept:String, month:String ):Observable<any>{
    return this._http.get(`${this.url}get-products?concept=${concept}&month=${month}`)
  }

   getTotal(incomeArray:Array<any>){
    let total=0;
    incomeArray.forEach((incomeObj)=>{
      total += incomeObj.amount;
    })
    return total;

  }

   private handleError(errorRes:HttpErrorResponse){
    let defaultMessage='Ha ocurrido un error';

    if(!errorRes.error || !errorRes.error.error){
      return throwError(defaultMessage);
    }

    if(errorRes.error.error){
      defaultMessage = errorRes.error.error;
      return throwError(defaultMessage); 
      }
    }
   

}
