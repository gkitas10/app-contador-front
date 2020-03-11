import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public ticket:Ticket;

  constructor(
    private _ticketService:TicketService,
    ) { 
      this.ticket=new Ticket('','','',new Date());
    }

  ngOnInit() {
    
  }
  onSubmit(form:NgForm){

    this._ticketService.saveTicket(this.ticket).subscribe(
      res=>{console.log(res);
    },
    error=>{console.log(error);
    }
  );

  }

}
