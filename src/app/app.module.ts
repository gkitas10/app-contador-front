import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import {ChartsModule} from 'ng2-charts';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { GraphicsComponent } from './components/graphics/Graphics.component';
import {AuthInterceptorService} from './components/interceptors/auth-interceptor.service';
import { GraphComponent } from './components/graph/graph.component';
import { TableComponent } from './components/table/table.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { ComparativeGraphicsComponent } from './components/comparative-graphics/comparative-graphics.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ModalComponent } from './components/modal/modal.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TicketComponent,
    HeaderComponent,
    GraphicsComponent,
    GraphComponent,
    TableComponent,
    TicketListComponent,
    TicketItemComponent,
    ComparativeGraphicsComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    ModalComponent,
    TutorialComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
