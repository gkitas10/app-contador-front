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
  public incomestateTitle:String = 'Estado de resultados'
  public incomestate:String = `Elige un periodo de tiempo. En nuestro caso elegiremos mayo de 2022`
  public incomestate2:String = `También puedes agregar un ingreso para este período mensual, en nuestro caso agregaremos 10000 por concepto de "Sueldo"`
  public graphicsTitle:String = 'Gráficas'
  public graphics:String = `Selecciona un período de tiempo para observar la distribución de los datos en una gráfica de lineas, barras o pastel. En este caso seleccionaremos mayo de 2022`
  public graphics2:String = `Se puede observar del lado derecho la cantidad de $3500 del mes de mayo, tambien se pueden observar datos de muestra de Enero y Abril`
  public comparativegraphicsTitle:String = 'Gráficas comparativas'
  public comparativegraphics:String = `Selecciona dos períodos de tiempo (meses o años) y observa las dos gráficas superpuestas`
  public comparativegraphics2:String = `Se puede observar la cantidad de $ 3500 del 10 de mayo (línea gris) junto a datos de prueba del mes de Abril (línea azul).`

  constructor() { }

  ngOnInit(): void {

  }

}
 