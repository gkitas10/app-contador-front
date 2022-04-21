import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  public ticket:Ticket;
  public successMsg:string;
  public errorMsg:string;
  public showAmountAst:boolean;
  public showConceptAst:boolean;
  public showProductAst:boolean;
  public showProviderAst:boolean;
  public showDateAst:boolean;
  public amount:number;
  public concept:string;
  public product:string;
  public provider:string;
  public date:string;
  

  constructor(
    private _ticketService:TicketService,
    ) { }

  ngOnInit() {
    
  }

  onSubmit(form:NgForm){
    this._ticketService.saveTicket(
      form.value.amount,
      form.value.concept,
      form.value.product,
      form.value.provider,
      form.value.date,
      form.value.notes
      ).subscribe(
      res => { 
        this.successMsg = res.message;
        const date = new Date(res.ticketDB.created)
        console.log(date)
        window.scroll({
          top:0,
          left:0
        })

        setTimeout(()=>{
          this.successMsg = undefined;
        }, 3000)
        
    },
    error=>{console.log(error);
      this.errorMsg = error.error.message;
    }
  );

  }

  onBlurAmount(){
    
    if(!this.amount) {
      this.showAmountAst = true;
    }else{
      this.showAmountAst = false;
    }
  }

  onBlurConcept(){
    
    if(!this.concept) {
      this.showConceptAst = true;
    }else{
      this.showConceptAst = false;
    }
  }

  onBlurProduct(){
    
    if(!this.product) {
      this.showProductAst = true;
    }else{
      this.showProductAst = false;
    }
  }

  onBlurProvider(){
    if(!this.provider) {
      this.showProviderAst = true;
    }else{
      this.showProviderAst = false;
    }
  }

  onBlurDate(){
    if(!this.date) {
      this.showDateAst = true;
    }else{
      this.showDateAst = false;
    }
  }

}
