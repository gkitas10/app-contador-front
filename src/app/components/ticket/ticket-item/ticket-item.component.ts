import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent {
  @Input() ticket:any;
 // @Input() tickets:any;
 // @Output() updateTickets = new EventEmitter<string>();
  public hideAnnotations = true;
  

  constructor(private _ticketService:TicketService) { }

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
