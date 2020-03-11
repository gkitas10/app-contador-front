import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest} from '@angular/common/http';
import { Global } from './Global';
import { Ticket } from '../models/ticket';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public url:String;
  public ticket:Ticket;
  

  constructor(
    private _http:HttpClient,
    
    ) {

    this.url=Global.url;
    
    
   }

   saveTicket(ticket:Ticket):Observable<any>{
    
     
      
     let body=ticket;
     return this._http.post(this.url+'save-ticket',body,{withCredentials:true});
   }

   getTickets():Observable<any>{
     return this._http.get(this.url+'get-tickets');
   }
}
