import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges{
  public lineChartData:Array<any>;
  public lineChartLabels:Array<string>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;
  @Input() dataGraph:Array<any>;

  constructor(private _ticketService:TicketService) { 
    this.lineChartOptions={ responsive:true, maintainAspectRatio: false },
    this.lineChartColors=[{
      backgroundColor:'rgba(148,159,177,0.2)',
      borderColor:'rgba(148,159,177,1)',
      pointBackgroundColor:'rgba(148,159,177,1)',
      pointBorderColor:'#fff',
      pointHoverBackgroundColor:'#fff',
      pointHoverBorderColor:'rgba(148,159,177,0.8)'
    }],
    this.lineChartLegend=false,
    this.lineChartType='line'

  }

  ngOnInit() {
   
   
  }

  ngOnChanges(){
    console.log( this.dataGraph )
    this.lineChartData=[this.dataGraph[0]];
    this.lineChartLabels=this.dataGraph[1];
  }

}
