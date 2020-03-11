import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { IncomeStatementComponent } from './components/income-statement/income-statement.component';

const appRoutes:Routes=[
    
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'tickets',component:TicketComponent},
    {path:'income-statement',component:IncomeStatementComponent},
    {path:'**',component:LoginComponent},
  
];

//Exportar el modulo router
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);


