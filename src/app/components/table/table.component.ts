import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TableService } from 'src/app/services/table.service';
import { Expenditure, Income } from '../../models/tableInterface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public expensesArray:Array<Expenditure>;
  public incomeArray:Array<Income>;
  public totalExpenditure:number;
  public expensesConcept:string;
  public totalIncome:number;
  public totalProducts:number;
  public productsArray:Array<Expenditure>;
  public profit:number;
  public showIncomeTable = false;
  public month:string;
  public showProductsTable = false;
  public showIncomeForm = false;
  public error = '';
  public deletedMsg:string;
  public incomeError = '';

  constructor(private _tableService:TableService,) { 
    
  }

  onSubmit(form:NgForm){
    this.error = '';
    this.incomeError = '';
    this.showIncomeForm = true;
    this.totalIncome = 0;
    this._tableService.getTableData(form.value.month).subscribe(resp=>{
      this.expensesArray = resp.dataArrays;
      this.totalExpenditure = this._tableService.getTotal( this.expensesArray );
      //Adjustment in case total expenditure isnt defined before calculating profit
      if( isNaN(this.profit) ){
      this.profit = this.totalIncome - this.totalExpenditure 
      }
      //defines property month in order to use it in getAccumulatedProductsAmounts method
      this.month = form.value.month;
      
    },errorRes=>{
      this.error = errorRes;
      return;
    });
    //gets all income objs for that month
    this._tableService.getIncomeArray( form.value.month ).subscribe(res=>{
    this.incomeArray = res.data;
    this.totalIncome = this._tableService.getTotal( this.incomeArray );
    this.profit = this.totalIncome - this.totalExpenditure;
    window.scroll({
      top:500,
      left:0
    })
    }, error=>{
      this.incomeError = error.error.error;
    })
  }
//Save an income item and calls onsubmit
  onSubmitIncome( form:NgForm ) {
    this._tableService.saveIncome(
      form.value.concept, form.value.amount, form.value.month
      ).subscribe(res => {
      //Gets all the expenditure and income for table  
     this.onSubmit( form );
     
    }, error => console.log( error ))
  }
//Change name of this method
  getIncome(){
    this.showIncomeTable = !this.showIncomeTable;
  }
  //Delete an income obj
  deleteIncome(idx:any){
    const incomeToDelete = this.incomeArray[idx];
    this._tableService.deleteIncome(incomeToDelete['_id']).subscribe(res => {
    this.deletedMsg = res.msg;
    //Deletes the item from the array to update
    this.incomeArray = this.incomeArray.filter(incomeitem => (
      incomeitem['_id'] !== incomeToDelete['_id']
    ));
//Calculate profit and income with new array
    this.totalIncome = this._tableService.getTotal( this.incomeArray );
    this.profit = this.totalIncome - this.totalExpenditure;

    },error => {
      this.incomeError = 'Ha ocurrido un error'
    })
  }
   
//gets products of specific concept and month
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
//hides products table when x button is clicked
  toggleProductsTable(){
    this.showProductsTable = !this.showProductsTable;
  }

}
