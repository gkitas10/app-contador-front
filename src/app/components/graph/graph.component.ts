import { Component, OnInit, OnDestroy } from '@angular/core';
import {Chart} from 'chart.js';
import { TicketService } from 'src/app/services/ticket.service';
import {Subscription } from "rxjs";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy{
  public lineChartData:Array<any>
  private dataSubs:Subscription;
  public dataObj:{data:Array<number>,label:string};

  constructor(private _ticketService:TicketService) { }

  ngOnInit() {
    this.dataSubs=this._ticketService.dataObj.subscribe(
      res=>{this.dataObj=res;
      console.log(this.dataObj)
      },
      error=>{
        console.log(error)
      }
    )
    console.log('despues de subs')
   
  }

  ngOnDestroy(){
    this.dataSubs.unsubscribe();
  }

}
