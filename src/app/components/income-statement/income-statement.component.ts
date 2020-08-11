import { Component, OnInit } from "@angular/core";
import { TicketService } from "../../services/ticket.service";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-income-statement",
  templateUrl: "./income-statement.component.html",
  styleUrls: ["./income-statement.component.css"],
})
export class IncomeStatementComponent implements OnInit {
  public tickets: any[];
  public filteredArray: any[];
  public dataGraph:any[];
  public total:number;
  public date:string;
  public month:string;
  public year:number;
  public error:boolean;
  

  constructor(private _ticketService: TicketService) {
    this.error=false;
  }

  ngOnInit() {
    this._ticketService.getTickets().subscribe(
      (res) => {
        this.tickets = res.tickets;
        console.log(this.tickets)
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTotal(){
    let total=this._ticketService.getTotal(this.filteredArray)
    this.total=total;
    
  }

  onSubmit(form: NgForm) {
    if(!form.value.date && !form.value.month &&
      !form.value.year && form.value.concept===''){
        this.error=true;
        return;
      }
    this.error=false;
    let combinedArr=this._ticketService.filterTickets(form,this.tickets)
    this.filteredArray=combinedArr[0];
    this.dataGraph=combinedArr[1];
    console.log(combinedArr);
    this.getTotal();
    
  }

  
}
