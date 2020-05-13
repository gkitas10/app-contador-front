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
  public total:number;
  public date:string;
  public month:string;
  public year:number;

  constructor(private _ticketService: TicketService) {}

  ngOnInit() {
    this._ticketService.getTickets().subscribe(
      (res) => {
        this.tickets = res.tickets;
        
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
    let filteredArray=this._ticketService.filterTickets(form,this.tickets)
    this.filteredArray=filteredArray;

    this.getTotal();
  }
}
