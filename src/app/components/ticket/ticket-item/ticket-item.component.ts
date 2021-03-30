import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket:any;
  @Input() top:number;
 // @Input() tickets:any;
 // @Output() updateTickets = new EventEmitter<string>();
  public hideAnnotations = true;
  

  constructor(private _ticketService:TicketService) { }

  ngOnInit(){
    window.scroll({
  top:this.top,
  left:0
})
console.log(this.top)
  }

  showAnnotations(){
    this.hideAnnotations = !this.hideAnnotations;
  }

  showModal(){
    this._ticketService.showModal.next({
      show:true,
      ticketid:this.ticket._id
      });
  }

}
