import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket:{};

  constructor() { }

  ngOnInit() {
  }

}
