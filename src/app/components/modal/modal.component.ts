import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges, OnInit {
  @Input() ticket:any;

  constructor(private _ticketService:TicketService) { }

  ngOnChanges(): void {

  }

  ngOnInit(){
    console.log(this.ticket)
  }

  deleteTicket(){
    this._ticketService.deleteTicket(this.ticket).subscribe(res => {
      this._ticketService.deleteLocalTicket.next(true);
      this.closeModal();
      
    }, error => {
      console.log(error)
    })
    
  }

  closeModal(){
    this._ticketService.showModal.next({
      show:false,
      ticketid:'123'
    });
  }

}
