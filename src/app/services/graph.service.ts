import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { catchError, exhaustMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Global } from "./Global";
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  public url = Global.url;
  public graphType = new BehaviorSubject<string>(null); 

  constructor(private _http: HttpClient, private _userService: UserService) { }

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
  //
  getDataForPieChart(
    month?:string,
    year?:number
  ):Observable<any>{
    return this._http.get(`${this.url}tickets-pie-chart?month=${month}&year=${year}`);
  }
  //Change graph type
  changeGraphType(type:string){
    this.graphType.next(type)
  }
}
