import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent {
  @Input() ticket:any;
  public hideAnnotations = true;

  constructor() { }

  showAnnotations(){
    this.hideAnnotations = !this.hideAnnotations;
  }

}
