import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TicketService } from "../../../services/ticket.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public tickets:Array<any>;
  public count:number;
  public from=0;
  

  constructor(private _ticketService:TicketService) {
    
   }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    console.log(this.from);
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
      },error=>{
        console.log(error);
      }
    );
  }

  nextPage(form:NgForm){
    this.from=this.from+12;
    this.onSubmit(form);
  }

  previousPage(form:NgForm){
    this.from=this.from-12;
    this.onSubmit(form);
  }
}
