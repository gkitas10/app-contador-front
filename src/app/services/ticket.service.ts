import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "./Global";
import { Ticket } from "../models/ticket";
import { Observable} from "rxjs";
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
 //Request that gets tickets array and data for graph
  getTicketsForGraphics(
    concept?:string,
    date?:string,
    month?:string,
    year?:number
  ):Observable<any>{
    const body = { concept, date, month, year }
    return this._userService.user.pipe(
      exhaustMap(user => {
        return this._http.post(`${this.url}tickets-graph/${user.id}`, body);
      })
    );
  }
//Funcion principal que devuelve lo que proviene de las funciones filtradoras de abajo
//y que alimenta el onsubmit de incomestatement
  filterTickets(form: NgForm, tickets: Array<any>) {
//there is concept and date
    if(form.value.concept!=='' && form.value.date){
      const filteredArray = tickets.filter(
        (ticket) =>
          ticket.date.slice(0, 10) === form.value.date &&
          ticket.concept === form.value.concept
      );
      //Recibe array data con objeto, emite el array data y devuelve el filteredArray
      let dataGraph=this.filterForGraph(form,tickets);

      return [filteredArray,dataGraph];
    }
    //there is concept and month
    if(form.value.concept !== '' && form.value.month){  
      const filteredArray = tickets.filter(
        (ticket) =>
          ticket.date.slice(0, 7) === form.value.month &&
          ticket.concept === form.value.concept
      );
      //Recibe array data con objeto, emite el array data y devuelve el filteredArray
      let dataGraph=this.filterForGraph(form,tickets);

      return [filteredArray,dataGraph];
    }
//there is concept and year
    if(form.value.concept!=='' && form.value.year){
      const filteredArray = tickets.filter(
        (ticket) =>
          +ticket.date.slice(0, 4) === form.value.year &&
          ticket.concept === form.value.concept
      );
      //Recibe array data con objeto, emite el array data y devuelve el filteredArray
      let dataGraph=this.filterForGraph(form,tickets);
      
      return [filteredArray,dataGraph];
    }
//concept is empty and there is date (done)
    if((!form.value.concept||form.value.concept==='')&&form.value.date){
      const filteredArray=tickets.filter(
       (ticket)=>
        ticket.date.slice(0,10)===form.value.date 
      );
      //Recibe array data con objeto, emite el array data y devuelve el filteredArray
      let dataGraph=this.filterForGraph(form,tickets);
      
      return [filteredArray,dataGraph];
      
    }
//concept is empty and there is month
    if((!form.value.concept||form.value.concept==='')&&form.value.month){
      const filteredArray=tickets.filter(
        (ticket) =>
        ticket.date.slice(0,7)===form.value.month
      );

      let dataGraph=this.filterForGraph(form,tickets);
  
      return [filteredArray,dataGraph];
    }
//concept is empty and there is year
   if((!form.value.concept||form.value.concept==='')&& form.value.year){
     const filteredArray=tickets.filter(
       (ticket)=>
       ticket.date.slice(0,4)===form.value.year.toString()
     
     );

     let dataGraph=this.filterForGraph(form,tickets);

     return [filteredArray,dataGraph];
   }
//There'snothing but concept
   if(!form.value.date && !form.value.month &&
     !form.value.year && form.value.concept!==''){
      const filteredArray=tickets.filter(
        (ticket)=>
        ticket.concept===form.value.concept
        );

        let dataGraph=this.filterForGraph(form,tickets);
        return [filteredArray,dataGraph];
     }
//Every field is empty
     if(!form.value.date && !form.value.month &&
      !form.value.year && form.value.concept===''){
        return [tickets];
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
      let filt=this.createDateDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:'Todo el gasto durante el mes'
      }

      let datesGraph=this.createDateLabelArray(filteredGraph);
      
     let data=[];
     data.push(dataObj);
     data.push(datesGraph);
      return data;
    }
//there is no concept and there is month
    if(form.value.concept==='' && form.value.month){
      let filteredGraph=tickets.filter(
        (ticket)=>
      ticket.date.slice(0,4)===form.value.month.slice(0,4)
      )

      filteredGraph.sort((a,b)=>{
        let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
        let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
        return date.getTime()-date2.getTime()
      })
      //Funcion que itera en el array ordenado
      let filt=this.createMonthDataArray(filteredGraph);
        
      let dataObj={
        data:filt,
        label:'Todo el gasto durante el año'
      };

      let monthsGraph=this.createMonthLabelArray(filteredGraph);
      let data=[dataObj,monthsGraph];

      return data;
    }
//There is no concept and there is year
    if(form.value.concept==='' && form.value.year){
      let filteredGraph=tickets.sort((a,b)=>{
        let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
        let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
        return date.getTime()-date2.getTime()
      });

      //Funcion que itera en el array ordenado
      let filt=this.createYearDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:'Gasto total'
      };

      let yearsGraph=this.createYearLabelArray(filteredGraph);
      let data=[dataObj,yearsGraph];
      return data;
    }
    //There is concept and there is date
    if(form.value.concept!=='' && form.value.date){
      let filteredGraph=tickets.filter(
        (ticket)=>
      ticket.date.slice(0,7)===form.value.date.slice(0,7) &&
      ticket.concept===form.value.concept
      );

      filteredGraph.sort((a,b)=>{
        let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
        let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
        return date.getTime()-date2.getTime()
      });
      //Sacar concepto de filterg
      let concept=filteredGraph[0].concept;
      //Funcion que itera en el array ordenado
      let filt=this.createDateDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:`Gasto diario de ${concept}`
      }

      let datesGraph=this.createDateLabelArray(filteredGraph);
      
     let data=[];
     data.push(dataObj);
     data.push(datesGraph);
      return data;
    }
    //There is concept and there is month
    if(form.value.concept!=='' && form.value.month){
      let filteredGraph=tickets.filter(
        (ticket)=>
      ticket.date.slice(0,4)===form.value.month.slice(0,4) &&
      ticket.concept===form.value.concept
      );

      filteredGraph.sort((a,b)=>{
        let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
        let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
        return date.getTime()-date2.getTime()
      })
       //Sacar concepto de filterg
       let concept=filteredGraph[0].concept;
      //Funcion que itera en el array ordenado
      let filt=this.createMonthDataArray(filteredGraph);

      let dataObj={
        data:filt,
        label:`Gasto de ${concept}`
      }

      let monthsGraph=this.createMonthLabelArray(filteredGraph);
      
      return [dataObj,monthsGraph];
      
    }
    //There is concept and there is year
    if(form.value.concept!=='' && form.value.year){
      let filteredGraph=tickets.filter(
        ticket=>(
          ticket.concept===form.value.concept
          )
        );

        filteredGraph.sort((a,b)=>{
          let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
          let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
          return date.getTime()-date2.getTime()
        });
        //Concept de array
        let concept=filteredGraph[0].concept;
        //Funcion que itera en el array ordenado
      let filt=this.createYearDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:`Gasto de ${concept}`
      }

      let yearsGraph=this.createYearLabelArray(filteredGraph);
      
      return [dataObj,yearsGraph];
    }
    //There is nothing but concept
    if(form.value.concept !=='' && !form.value.date && !form.value.month
     && !form.value.year){
      let filteredGraph=tickets.filter(
        ticket=>(
          ticket.concept===form.value.concept
          )
        );

        filteredGraph.sort((a,b)=>{
          let date=new Date(a.date.slice(0,10).replace(/-/g,'/'));
          let date2=new Date(b.date.slice(0,10).replace(/-/g,'/'));
          return date.getTime()-date2.getTime()
        });
        //Concept de array
        let concept=filteredGraph[0].concept;
        //Funcion que itera en el array ordenado
      let filt=this.createYearDataArray(filteredGraph);
      let dataObj={
        data:filt,
        label:`Gasto de ${concept}`
      }

      let yearsGraph=this.createYearLabelArray(filteredGraph);
      
      return [dataObj,yearsGraph];

     }
  }

  createDateDataArray(filteredGraph:Array<any>){
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
    //Array solo con numeros ya reducidos por fecha
    return filt;
  }

  createDateLabelArray(filteredGraph:Array<any>){
    let datesArr=filteredGraph.map(ticket=>(
      ticket.date.slice(0,10)
    ));

    let datesGraph=datesArr.filter((date,idx)=>(
      datesArr.indexOf(date)===idx
    ));

    return datesGraph;
  }

    createMonthDataArray(filteredGraph:Array<any>){
      let init=filteredGraph[0].date.slice(0,7);
      let filt=[];
      outerloop:for(let i=0;i<filteredGraph.length;i++){
        if(filteredGraph[i].date.slice(0,7)===init){ 
          let amount=0;
          for(let k=i;k<filteredGraph.length;k++){
            if(filteredGraph[k].date.slice(0,7)===filteredGraph[i].date.slice(0,7)){
              amount+=filteredGraph[k].amount; 
              if(filteredGraph.indexOf(filteredGraph[k+1])===-1){
                filt.push(amount);
                break outerloop;
              }
            }

            if(filteredGraph[k].date.slice(0,7)!==init){
                init=filteredGraph[k].date.slice(0,7);
                filt.push(amount);
                break;
            }
          }
        }
        if(filteredGraph[i].date.slice(0,7)!==init){
          continue;
        }
      }
      //Array solo con numeros ya reducidos por fecha
      return filt;
    }

  createMonthLabelArray(filteredGraph:Array<any>){
    let monthsArr=filteredGraph.map(ticket=>(

      ticket.date.slice(5,7)
    ))
    .filter((date,idx,arr)=>(
      arr.indexOf(date)===idx
    ));

    let labelArr=[];

    for (let i=0;i<monthsArr.length;i++){
      switch ( monthsArr[i] ) {
        case '01':labelArr.push('Enero')
        break;
        case '02':labelArr.push('Febrero')
        break;
        case '03':labelArr.push('Marzo')
        break;
        case '04':labelArr.push('Abril')
        break;
        case '05':labelArr.push('Mayo')
        break;
        case '06':labelArr.push('Junio')
        break;
        case '07':labelArr.push('Julio')
        break;
        case '08':labelArr.push('Agosto')
        break;
        case '09':labelArr.push('Septiembre')
        break;
        case '10':labelArr.push('Octubre')
        break;
        case '11':labelArr.push('Noviembre')
        break;
        case '12':labelArr.push('Diciembre')
        break;
      }
    }
    return labelArr;
  }

  createYearDataArray(filteredGraph:Array<any>){
    let init=filteredGraph[0].date.slice(0,4);
  let filt=[];
  outerloop:for(let i=0;i<filteredGraph.length;i++){
    if(filteredGraph[i].date.slice(0,4)===init){ 
      let amount=0;
      for(let k=i;k<filteredGraph.length;k++){
        if(filteredGraph[k].date.slice(0,4)===filteredGraph[i].date.slice(0,4)){
          amount+=filteredGraph[k].amount; 
          if(filteredGraph.indexOf(filteredGraph[k+1])===-1){
            filt.push(amount);
            break outerloop;
          }
        }

        if(filteredGraph[k].date.slice(0,4)!==init){
            init=filteredGraph[k].date.slice(0,4);
            filt.push(amount);
            break;
        }
      }
    }
    if(filteredGraph[i].date.slice(0,4)!==init){
      continue;
    }
  }
  return filt;
  }

  createYearLabelArray(filteredGraph:Array<any>){
    let yearsArr=filteredGraph.map(ticket=>(

      ticket.date.slice(0,4)
    ))
    .filter((date,idx,arr)=>(
      arr.indexOf(date)===idx
    ));

    return yearsArr;
  }

  getTotal(filteredArray:Array<any>){
    let total=0;
    filteredArray.forEach((ticket)=>{
      total+=ticket.amount;
    })
    return total;

  }
}
