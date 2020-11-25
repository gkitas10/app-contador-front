import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GraphicsService } from '../../services/graphics.service';

@Component({
  selector: 'app-comparative-graphics',
  templateUrl: './comparative-graphics.component.html',
  styleUrls: ['./comparative-graphics.component.css']
})
export class ComparativeGraphicsComponent implements OnInit {
  public lineChartData:Array<any>;
  public lineChartLabels:Array<string>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;
  public month:string;
  public year:string;
  public InputValue:string;
  public InputValue2:string;
  public showMonthInput = true;
  public showYearInput = true;
  public showSecondForm = false;
  public concept:string;//First form concept
  
  constructor(private _graphicsService:GraphicsService) {
    this.lineChartOptions={ responsive:true, maintainAspectRatio: false },
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
    if( form.value.month === '' || form.value.month === undefined){
      this.InputValue = form.value.year;
      this.showMonthInput = false;
      this.showYearInput = true;
    }else{
      this.InputValue = form.value.month;
      this.showMonthInput = true;
      this.showYearInput = false;
    }
    console.log(form.value.month, 'year', form.value.year)
    
    
    this._graphicsService.firstDataSetForGraphics(
      form.value.concept,
      form.value.month,
      form.value.year
    ).subscribe(
      res => {
        this.lineChartData = [ res.data[0] ];
        this.lineChartLabels = res.data[1];

        res.data.length === 2 ? this.showSecondForm = true : null
        
      },error => {
        console.log(error)
      }
    );

  }

  onSubmitSeconddataSet(form:NgForm){
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
    });
  }
}
