import { Component, EventEmitter, Output } from '@angular/core';
import { TicketService } from "../../services/ticket.service";
import { NgForm } from "@angular/forms";
import { GraphicsService } from '../../services/graphics.service';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public lineChartData:Array<any>;
  public lineChartLabels:Array<string>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;
  //
  public tickets: any[];
  public filteredArray: any[];
  public dataGraph:any[];
  public dataGraphSecondLine:any[];
  public total:number;
  public date:string;
  public month:string;
  public year:number;
  public error:boolean;
  public newARR:any[];
  public showInput:String;
  @Output() graphType = new EventEmitter<string>();
  public errorReq:string;
  
  constructor(private _ticketService: TicketService, private _graphService:GraphService) {
    this.error=false;
    //Inside lineChartOptions maintainAspectRatio: false for changing graph proportions
    this.lineChartOptions={ responsive:true },
    this.lineChartColors=[{
      backgroundColor:'rgba(148,159,177,0.2)',
      borderColor:'rgba(148,159,177,1)',
      pointBackgroundColor:'rgba(148,159,177,1)',
      pointBorderColor:'#fff',
      pointHoverBackgroundColor:'#fff',
      pointHoverBorderColor:'rgba(148,159,177,0.8)'
    }],
    this.lineChartLegend=true,
    this.lineChartType='line'
  }

  getTotal(){
    let total=this._ticketService.getTotal(this.filteredArray)
    this.total=total;
  }

  onSubmit(form: NgForm) {
    this.total = null;
    this.lineChartData = null;
    this.errorReq = null;
    if(!form.value.date && !form.value.month &&
      !form.value.year && form.value.concept === '' ) {
        this.error=true;
        return;
      }

    this.error=false;
    this._graphService.getTicketsForGraphics(
    form.value.concept,
    form.value.date,
    form.value.month,
    form.value.year
    ).subscribe(res=>{
      this.filteredArray=res.data[0];
      console.log(this.filteredArray)
      this.lineChartData = [ res.data[1][0] ];
      console.log(this.lineChartData)
      this.lineChartLabels = res.data[1][1];
     // this.showInput = this.getInputWord(res.data[1][0].label) 
      this.getTotal();
    },error =>{
      this.errorReq = error.error.error;
    })
  } 

  changeGraphType(event:Event){
    this.graphType.emit((<HTMLDivElement>event.target).innerHTML)
  }
}
