import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels'
import { NgForm } from '@angular/forms';
import { GraphService } from '../../services/graph.service';
import { TicketService } from "../../services/ticket.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Output() graphType = new EventEmitter<string>();
  public errorReq:string;
  public error:string;
  public year:number;
  public month:string;
  public total:number;
  public dataAmountsArray:Array<number>;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[];
  

  constructor(private _graphService:GraphService, private _ticketService: TicketService) { }

  ngOnInit(): void {
  }

  getTotal(){
    let total:any = this._ticketService.getTotalForPie(this.dataAmountsArray);
    this.total = total;
  }

  onSubmit(form:NgForm){ 
    this.errorReq = null;
    this.barChartData = null;
    //Use the same service and route as piechart component
    this._graphService.getDataForPieChart(form.value.month, form.value.year).subscribe(
      res => {
        console.log(res)
        this.dataAmountsArray = res.data[1];
        this.barChartLabels = res.data[0];
        const dataSet = {
          data:res.data[1],
          label:'Gastos'
        }

        this.getTotal();
        this.barChartData = [dataSet];
        console.log(this.barChartData)
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
