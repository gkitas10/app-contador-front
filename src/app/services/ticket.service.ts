import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "./Global";
import { Ticket } from "../models/ticket";
import { Observable,BehaviorSubject } from "rxjs";
import { catchError, exhaustMap, take } from "rxjs/operators";
import { throwError } from "rxjs";
import { UserService } from "./user.service";
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  public url: String;
  public ticket: Ticket;
  public dataObj = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient, private _userService: UserService) {
    this.url = Global.url;
  }

  saveTicket(amount: number, concept: string, date: Date): Observable<any> {
    let body = {
      amount,
      concept,
      date,
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
      take(1),
      exhaustMap((user) => {
        return this._http.get(this.url + "get-tickets/" + user.id);
      })
    );
  }

  filterTickets(form: NgForm, tickets: Array<any>) {
//there is concept and date
    if(form.value.concept!=='' && form.value.date){
      const filteredArray = tickets.filter(
        (ticket) =>
          ticket.date.slice(0, 10) === form.value.date &&
          ticket.concept === form.value.concept
      );
      return filteredArray;
    }
    //there is concept and month
    if(form.value.concept!=='' && form.value.month){
      const filteredArray = tickets.filter(
        (ticket) =>
          ticket.date.slice(0, 7) === form.value.month &&
          ticket.concept === form.value.concept
      );
      return filteredArray;
    }
//there is concept and year
    if(form.value.concept!=='' && form.value.year){
      const filteredArray = tickets.filter(
        (ticket) =>
          +ticket.date.slice(0, 4) === form.value.year &&
          ticket.concept === form.value.concept
      );
      
      return filteredArray;
    }
//concept is empty and there is date
    if((!form.value.concept||form.value.concept==='')&&form.value.date){
      const filteredArray=tickets.filter(
       (ticket)=>
        ticket.date.slice(0,10)===form.value.date 
      );
      let dataObj=this.filterForGraph(form,tickets);
      this.dataObj.next(dataObj);
      return filteredArray; 
    }
//concept is empty and there is month
    if((!form.value.concept||form.value.concept==='')&&form.value.month){
      const filteredArray=tickets.filter(
        (ticket) =>
        ticket.date.slice(0,7)===form.value.month

      );
      return filteredArray;
    }
//concept is empty and there is year
   if((!form.value.concept||form.value.concept==='')&& form.value.year){
     const filteredArray=tickets.filter(
       (ticket)=>
       ticket.date.slice(0,4)===form.value.year.toString()
     
     );
     return filteredArray;
   }
//There'snothing but concept
   if(!form.value.date && !form.value.month &&
     !form.value.year && form.value.concept!==''){
      const filteredArray=tickets.filter(
        (ticket)=>
        ticket.concept===form.value.concept
        );
        return filteredArray;
     }
    
  }

  filterForGraph(form: NgForm,tickets: Array<any>){
    //There is no concept and there is date
    if(form.value.concept==='' && form.value.date){
      let filteredGraph=tickets.filter(
        (ticket)=>
      ticket.date.slice(0,7)===form.value.date.slice(0,7)
      )
      filteredGraph.sort((a,b)=>{
        let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
        let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
        return date.getTime()-date2.getTime()
      })
      //Funcion que itera en el array ordenado
      let filt=this.createDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:'Serie A'
      }
      return dataObj;
    }
   
  }

  createDataArray(filteredGraph:Array<any>){
    let init=filteredGraph[0].date;
    let filt=[];
    outerloop:for(let i=0;i<filteredGraph.length;i++){
      if(filteredGraph[i].date===init){ 
        let amount=0;
        for(let k=i;k<filteredGraph.length;k++){
          if(filteredGraph[k].date===filteredGraph[i].date){
            amount+=filteredGraph[k].amount; 
            if(filteredGraph.indexOf(filteredGraph[k+1])===-1){
              filt.push(amount);
              break outerloop;
            }
          }

          if(filteredGraph[k].date!==init){
              init=filteredGraph[k].date;
              filt.push(amount);
              break;
          }
        }
      }
      if(filteredGraph[i].date!==init){
        continue;
      }
    }
    return filt;
  }

  getTotal(filteredArray:Array<any>){
    let total=0;
    filteredArray.forEach((ticket)=>{
      total+=ticket.amount;
    })
    return total;

  }
}
