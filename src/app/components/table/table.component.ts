import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public totalsArray:Array<number>;
  public error:String;

  constructor(private _tableService:TableService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.error='';
    console.log(form.value.month);
    this._tableService.getTableData(form.value.month).subscribe(res=>{
      this.totalsArray=res.dataArrays;
      console.log( 'resp', res);
      console.log(this.totalsArray);
    },errorRes=>this.error=errorRes);
  }

}
