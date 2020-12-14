import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "./Global";
import { Ticket } from "../models/ticket";
import { Observable} from "rxjs";
import { catchError, exhaustMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { UserService } from "./user.service";
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  public url: String;
  public ticket: Ticket;
  

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = Global.url;
  }

  saveTicket(
    amount: number,
    concept: string,
    product:string,
    provider:string,
    date: string,
    notes?: string
    ): Observable<any> {
    let body = {
      amount,
      concept,
      product,
      provider,
      date,
      notes
    };

    return this._http.post(this.url + "save-ticket", body).pipe(
      catchError((errRes) => {
        let errorMessage = "An error has ocurred";
        if (!errRes.error) {
          return throwError(errorMessage);
        }
        if (errRes.error) {
          errorMessage = errRes.error;
          return throwError(errorMessage);
        }
      })
    );
  }

  getTickets(): Observable<any> {
       return this._userService.user.pipe(
     // take(1),
      exhaustMap((user) => {
        return this._http.get(this.url + "get-tickets/" + user.id);
      })
    );
  }

  getTicketItems(
    concept?:string,
    product?:string,
    provider?:string,
    date?:string,
    month?:string,
    from?:number
    ):Observable<any>{
    const body={concept,product,provider,date,month}
    return this._userService.user.pipe(
      exhaustMap((user)=>{
        return this._http.post(`${this.url}ticket-items/${user.id}/?from=${from}`,body);
      })
    )
  }

  getTotal(filteredArray:Array<any>){
    let total=0;
    filteredArray.forEach((ticket)=>{
      total+=ticket.amount;
    })
    return total;

  }
}
