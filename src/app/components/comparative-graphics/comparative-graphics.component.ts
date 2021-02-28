import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgForm } from "@angular/forms";
import { GraphicsService } from '../../services/graphics.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-comparative-graphics',
  templateUrl: './comparative-graphics.component.html',
  styleUrls: ['./comparative-graphics.component.css']
})
export class ComparativeGraphicsComponent implements OnInit {
  public errorReq:string;
  public lineChartData:Array<any>;
  public lineChartLabels:Array<string>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  
  public month:string;
  public year:string;
  public InputValue:string;
  public InputValue2:string;
  public showMonthInput = true;
  public showYearInput = true;
  public showSecondForm = false;
  public concept:string;//First form concept
  
  constructor(private _graphicsService:GraphicsService) {
    this.lineChartOptions={ responsive:true /*maintainAspectRatio: false*/ },
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

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.lineChartData = null;
    this.errorReq = null;
    if( form.value.month === '' || form.value.month === undefined){
      this.InputValue = form.value.year;
      this.showMonthInput = false;
      this.showYearInput = true;
    }else{
      this.InputValue = form.value.month;
      this.showMonthInput = true;
      this.showYearInput = false;
    }
    
    this._graphicsService.firstDataSetForGraphics(
      form.value.concept,
      form.value.month,
      form.value.year
    ).subscribe(
      res => {
        this.lineChartData = [ res.data[0] ];
        console.log(this.lineChartData)
        this.lineChartLabels = res.data[1];

        res.data.length === 2 ? this.showSecondForm = true : null
        
      },error => {
        console.log(error)
        this.errorReq = error.error.error;
      }
    );

  }

  onSubmitSeconddataSet(form:NgForm){
    this.errorReq = null;
    if( form.value.month === '' || form.value.month === undefined){
      this.InputValue2 = form.value.year;
    }else{
      this.InputValue2 = form.value.month;
    }
    //use graphics service method to get data for the second dataset
    this._graphicsService.secondDataSetForGraphics(
      form.value.concept,
      form.value.month,
      form.value.year
    ).subscribe(res => {
      //structure data to be ready to be used by combineData method from graphics service
      const dataAndLabels1 = [ this.lineChartData[0], this.lineChartLabels ];
      const dataAndLabels2 = [ res.data[0], res.data[1] ];
      let labelValues:string;
      let labelValues2:string;
      //Check if first form concept is ''
      if(this.concept === undefined || this.concept === ''){
        labelValues = `${this.InputValue}`;
      }else{
        //In case there's some value, puts it in parentesis
        labelValues = `${this.InputValue} (${this.concept})`;
      }

      const secondFormConcept = `(${form.value.concept})`;
      //Check if second form concept is '()', in this case there is '' in form.value.concept (second form)
      if( secondFormConcept !== '()'){
        //If there is a value, it includes it in labelvalues
         labelValues2 = `${this.InputValue2} ${secondFormConcept}`;
      }else{
        labelValues2 = `${this.InputValue2}`
      }
      //call combinedData(method from graphics service) 
      const finalData = this._graphicsService.combineData(dataAndLabels1, dataAndLabels2)
      this.lineChartData = [ {data:finalData[1], label:labelValues}, { data:finalData[2], label:labelValues2}]
      this.lineChartLabels = finalData[0];
      this.showSecondForm = false;
    }, error => {
      console.log(error)
      this.errorReq = error.error.error;
    });
  }
}
