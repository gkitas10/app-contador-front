import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraphService } from '../../services/graph.service';
import { TicketService } from "../../services/ticket.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public month:string;
  public year:number;
  public error:string;
  @Output() graphType = new EventEmitter<string>();
  public errorReq:string;
  public total:number;
  public filteredArray: any[];
  //
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const total = +ctx.chart.getDatasetMeta(ctx.datasetIndex).total;
          
          const percentage = (value * 100/ total).toFixed(2);
          
          return percentage + '%';
        },
      },
    }
  };
//'rgba(0,255,224,0.3)', 'rgba(243,0,255,0.3)', 'rgba(61,104,110,0.3)''rgba(247,255,0,0.3)'
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(247,255,0,0.3)',
       'rgba(0,255,224,0.3)', 'rgba(243,0,255,0.3)', 'rgba(61,104,110,0.3)']
    }
  ];

  constructor(private _graphService:GraphService, private _ticketService: TicketService) { }

  ngOnInit(): void {
    console.log(this.month, this.year)
  }

  getTotal(){
    let total:any = this._ticketService.getTotalForPie(this.pieChartData);
    this.total = total;
    
  }

  onSubmit(form:NgForm){
    this.pieChartData = null;
    this.errorReq=null;
    
    this._graphService.getDataForPieChart(form.value.month, form.value.year).subscribe(
      res => {
        this.pieChartLabels = res.data[0];
        this.pieChartData = res.data[1];
        this.getTotal();
      }, error => {
        console.log(error)
        this.errorReq = error.error.error;
      }
    )
  }
  //Change graph
  changeGraphType(event:Event){
    this.graphType.emit((<HTMLDivElement>event.target).innerHTML)
  }

}
