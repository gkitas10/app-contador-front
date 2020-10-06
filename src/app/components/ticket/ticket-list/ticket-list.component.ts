import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TicketService } from "../../../services/ticket.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit{
  public tickets:Array<any>;
  public count=0;
  public from=0;
  public pages:number;
  

  constructor(private _ticketService:TicketService) {
    
   }

  ngOnInit() {
    
  }

  onSubmit(form:NgForm){
    console.log(form)
    
    
    this._ticketService.getTicketItems(
      form.value.concept,
      form.value.product,
      form.value.provider,
      form.value.date,
      form.value.month,
      this.from
      ).subscribe(
      res=>{
        this.tickets=res.ticketsDB;
        this.count=res.count;
        console.log(this.tickets);
        this.getPages();
      },error=>{
        console.log(error);
      }
    );
  }

  nextPage(form:NgForm){
    this.from=this.from+12;
    this.onSubmit(form);
    this.getPages();
  }

  previousPage(form:NgForm){
    this.from=this.from - 12;
    this.onSubmit(form);
    this.getPages();
  }

  getPages(){
    let pages=Math.ceil(this.count / 12);
    if(pages === 0){
      pages=1;
    }

    this.pages=pages;
  }
}
