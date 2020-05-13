import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { IncomeStatementComponent } from './components/income-statement/income-statement.component';
import {AuthguardService} from './services/auth.guard.service';

const appRoutes:Routes=[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'tickets',component:TicketComponent, canActivate:[AuthguardService]},
    {path:'income-statement',component:IncomeStatementComponent, canActivate:[AuthguardService]},
    {path:'**',component:LoginComponent},
  
];

//Exportar el modulo router
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);


