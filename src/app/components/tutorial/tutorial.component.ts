import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  public newticketTitle:String = 'Nuevo Ticket'
  public newticket:String = 'Ve a la página "Nuevo Ticket" y crea algunos tickets'
  public ticketlistTitle:String = 'Listado de tickets'
  public ticketlist:String = `Llena los criterios de busqueda y selecciona una fecha o mes. En este caso tenemos información en el dia 10/05/2022`

  constructor() { }

  ngOnInit(): void {

  }

}
 