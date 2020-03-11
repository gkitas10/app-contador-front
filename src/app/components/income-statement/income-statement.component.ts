import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.css']
})
export class IncomeStatementComponent implements OnInit {

  public AllTickets:Array<any>;
  public 

  constructor(private _ticketService:TicketService) { }

  ngOnInit() {
    this._ticketService.getTickets().subscribe(

      res=>{
        console.log(res);
        this.AllTickets=res;


      },error=>{

      }
    );
  }

}
