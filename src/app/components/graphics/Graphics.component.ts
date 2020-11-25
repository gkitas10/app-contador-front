import { Component, OnInit } from "@angular/core";
import { TicketService } from "../../services/ticket.service";
import { NgForm } from "@angular/forms";
import { GraphicsService } from '../../services/graphics.service';


@Component({
  selector: "app-income-statement",
  templateUrl: "./Graphics.component.html",
  styleUrls: ["./Graphics.component.css"],
})
export class GraphicsComponent implements OnInit {
  public tickets: any[];
  public filteredArray: any[];
  public dataGraph:any[];
  public dataGraphSecondLine:any[];
  public total:number;
  public date:string;
  public month:string;
  public year:number;
  public error:boolean;
  public newARR:any[];
  public showInput:String;
  

  constructor(private _ticketService: TicketService, private _graphicsService:GraphicsService) {
    this.error=false;
  }

  ngOnInit() {
    /*this._ticketService.getTickets().subscribe(
      (res) => {
        this.tickets = res.tickets;
        console.log(this.tickets)
        
      },
      (error) => {
        console.log(error);
      }
    );*/
  }

  getTotal(){
    let total=this._ticketService.getTotal(this.filteredArray)
    this.total=total;
    
  }

  onSubmit(form: NgForm) {
    if(!form.value.date && !form.value.month &&
      !form.value.year && form.value.concept === '' ) {
        this.error=true;
        return;
      }

    this.error=false;

    /*let combinedArr=this._ticketService.filterTickets(form,this.tickets)
    this.filteredArray=combinedArr[0];
    this.dataGraph=combinedArr[1];*/
    
    //this.getTotal();

      this._ticketService.getTicketsForGraphics(
      form.value.concept,
      form.value.date,
      form.value.month,
      form.value.year
    ).subscribe(res=>{
      
      this.filteredArray=res.data[0];
      this.dataGraph=res.data[1];
      this.showInput = this.getInputWord(res.data[1][0].label) 
      console.log(this.showInput)
      this.getTotal();
      
    },error =>{
      console.log(error)
    })
  } 

  onSubmitSecondLine(form: NgForm){
    console.log(form.value)
    this._ticketService.getTicketsForGraphics(
      form.value.concept,
      form.value.date,
      form.value.month,
      form.value.year
    ).subscribe(res => {
        this.dataGraphSecondLine = res.data[1]; 
        const dataForGraphW2Lines = this._graphicsService.combineData(this.dataGraph, this.dataGraphSecondLine);   
        console.log(dataForGraphW2Lines)
    }, error =>{
      console.log(error)
    });
  }

  //Get the type of input to show for the second form
  getInputWord(sentence:string){
    const words = sentence.split(" ");
    const lastWord = words[ words.length -1 ];

    if( lastWord === 'mes' ) return 'date'
    if( lastWord === 'año' ) return 'month'
    if( lastWord === 'anualmente' ) return 'year'
  }

}
