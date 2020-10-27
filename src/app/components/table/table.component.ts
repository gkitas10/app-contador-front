import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TableService } from 'src/app/services/table.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public expensesArray:Array<number>;
  public incomeArray:Array<number>;
  public totalExpenditure:number;
  public expensesConcept:String;
  public totalIncome:number;
  public totalProducts:number;
  public productsArray:Array<object>;
  public profit:number;
  public showIncomeTable = false;
  public month:String;
  public showProductsTable = false;
  public error:String;

  constructor(private _tableService:TableService, private _ticketService:TicketService) { 
    
  }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.error='';
    
    this._tableService.getTableData(form.value.month).subscribe(res=>{
    const dataArray = res.dataArrays;
    this.expensesArray = dataArray;
    this.totalExpenditure = this._tableService.getTotal( dataArray );
    this.month = form.value.month;
      
    
    },errorRes=>this.error = errorRes);

    this._tableService.getIncomeArray( form.value.month ).subscribe(res=>{
    this.incomeArray = res.data;
    this.totalIncome = this._tableService.getTotal( res.data );
    console.log(res)
    this.profit = this.totalIncome - this.totalExpenditure;
    }, error=>console.log( error ))
  }

  onSubmitIncome( form:NgForm ) {
    this._tableService.saveIncome(
      form.value.concept, form.value.amount, form.value.month
      ).subscribe(res => {
      console.log( res );
      this.onSubmit( form );
    }, error => console.log( error ))
  }

  getIncome(){
    console.log( this.incomeArray )
    this.showIncomeTable = !this.showIncomeTable;
  }

  getAccumulatedProductsAmounts( event:Event ){
     const concept = (<HTMLDivElement>event.target).innerHTML;
     this.expensesConcept = concept;
     this._tableService.getAccumulatedProductsAmounts(concept, this.month).subscribe(res => {
      this.productsArray = res.data;
      this.totalProducts = this._tableService.getTotal( this. productsArray );
      console.log( this.totalProducts)
      this.showProductsTable = true;
     }, error => {
      console.log(error);
     })
  }

}
