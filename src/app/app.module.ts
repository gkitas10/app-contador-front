import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing,appRoutingProviders } from './app.routing';
import {ChartsModule} from 'ng2-charts';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { IncomeStatementComponent } from './components/income-statement/income-statement.component';
import {AuthInterceptorService} from './components/interceptors/auth-interceptor.service';
import { GraphComponent } from './components/graph/graph.component';
import { TableComponent } from './components/table/table.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TicketComponent,
    HeaderComponent,
    IncomeStatementComponent,
    GraphComponent,
    TableComponent,
    TicketListComponent,
    TicketItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ChartsModule
  ],
  providers: [appRoutingProviders,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
