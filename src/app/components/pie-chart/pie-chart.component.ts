import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraphService } from '../../services/graph.service';

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

  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private _graphService:GraphService) { }

  ngOnInit(): void {
    console.log(this.month, this.year)
  }

  onSubmit(form:NgForm){
    this.pieChartData = null;
    this.errorReq=null;
    console.log('ji')
    this._graphService.getDataForPieChart(form.value.month, form.value.year).subscribe(
      res => {
        this.pieChartLabels = res.data[0];
        this.pieChartData = res.data[1];
        console.log(res)
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
