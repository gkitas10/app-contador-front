import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { GraphicsComponent } from './components/graphics/Graphics.component';
import {AuthguardService} from './services/auth.guard.service';
import { TableComponent } from './components/table/table.component';
import {TicketListComponent} from './components/ticket/ticket-list/ticket-list.component';
import { ComparativeGraphicsComponent } from './components/comparative-graphics/comparative-graphics.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const appRoutes:Routes=[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'income-statement', component:TableComponent, canActivate:[AuthguardService]},
    {path:'ticket', component:TicketComponent, canActivate:[AuthguardService]},
    {path:'graphics', component:GraphicsComponent, canActivate:[AuthguardService]},
    {path:'other-graphics', component:ComparativeGraphicsComponent, canActivate:[AuthguardService]},
    {path:'ticket-list', component:TicketListComponent, canActivate:[AuthguardService]},
    {path:'tutorial', component:TutorialComponent },
    {path:'**', component:LoginComponent},
  
];

//Exportar el modulo router
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);


