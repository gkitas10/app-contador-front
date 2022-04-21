import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TicketService } from "../../../services/ticket.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnDestroy, OnInit{
  public tickets:any[] = [];
  public count=0;
  public from=0;
  public pages:number;
  public subscription:Subscription;
  public deleteLocalSubs:Subscription;
  public showModal:boolean = false;
  public ticketToDelete:string;
  public form:NgForm;
  public errorMsg:string;
  public CreatedDateForm:boolean = false;
  public ticketsOnscreen:boolean = false;
  @ViewChild('ticketsContainerDiv', {static:true}) ticketsContainerDiv:ElementRef;
  public top:number;
  public test:number = 1;

  constructor(private _ticketService:TicketService) {
    
   }

  scrollDown() {
    let rect = this.ticketsContainerDiv.nativeElement.getBoundingClientRect();
    this.top = rect.top;
  } 

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.deleteLocalSubs.unsubscribe()
  }

  ngOnInit(){
    // this.ticketsOnscreen = this.tickets.length > 0 ? true : false; Cambiar a on submit
    console.log(this.ticketsOnscreen)
    console.log(this.tickets)
    this.subscription = this._ticketService.showModal.subscribe(res => {
    this.showModal = res.show;
    this.ticketToDelete = res.ticketid;
    },
      error=>{
        console.log(error)
      })

    this.deleteLocalSubs = this._ticketService.deleteLocalTicket.subscribe(res => {
    this.tickets = this.tickets.filter(ticket => (
    ticket._id !== this.ticketToDelete
    ))

    this.count = this.count - 1;
    this.getPages();

    if(this.tickets.length === 0){
      if(this.from >= 12){
        this.firstPage(this.form);
      }
     }
    }, error => {
      console.log(error);
    })   
  }

  onSubmit(form:NgForm){
    console.log(this.CreatedDateForm, this.ticketsOnscreen);
    this.errorMsg = undefined;
    this.tickets = undefined;
    this.form = form;
    this._ticketService.getTicketItems(
      form.value.concept,
      form.value.product,
      form.value.provider,
      form.value.date,
      form.value.month,
      '',
      this.from
      ).subscribe(
      res=>{
        this.tickets=res.ticketsDB;
        this.ticketsOnscreen = this.tickets.length > 0 ? true : false;
        console.log(this.tickets);
        
        this.count=res.count;
        this.getPages();
        
      },error=>{
        this.errorMsg = error.error.message;
      }
    );
  }

  onSubmitCreatedDate(form:NgForm){
    this.errorMsg = undefined;
    this.tickets = undefined;
    this.form = form;
    const date = new Date(form.value.created.replace(/-/g, '\/')).toString();
    
    this._ticketService.getTicketItems(
      '','','','','', date, this.from
    ).subscribe(res=>{
      console.log(this.form)
      this.tickets=res.ticketsDB;
      this.ticketsOnscreen = this.tickets.length > 0 ? true : false;
      this.count=res.count;
      this.getPages();
    }
    ,error=> {
      this.errorMsg = error.error.message;
    })
  }

  firstPage(form:NgForm){
    this.from = 0;
    this.onSubmit(form);
    this.getPages();
  }

  nextPage(CreatedDateForm){
    console.log(this.CreatedDateForm, this.ticketsOnscreen);
    
    this.from=this.from+12;
    //this.onSubmit(this.form);
    //this.getPages();
    if(CreatedDateForm) {
      console.log(this.form)
      this.onSubmitCreatedDate(this.form)
    }else {
      this.onSubmit(this.form);
      this.getPages();
    }
    
  }

  previousPage(CreatedDateForm){
    this.from=this.from - 12;
    //this.onSubmit(this.form);
    //this.getPages();

    if(CreatedDateForm) {
      console.log(this.form)
      this.onSubmitCreatedDate(this.form)
    }else {
      this.onSubmit(this.form);
      this.getPages();
    }
  }

  getPages(){
    let pages=Math.ceil(this.count / 12);
    if(pages === 0){
      pages=1;
    }

    this.pages=pages;
  }

  showCreatedDateForm(){
    this.CreatedDateForm = true;
  }

  hideCreatedDateForm(){
    this.CreatedDateForm = false;
  }
}
