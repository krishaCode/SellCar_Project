import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminDashboard
  ]
})
export class AdminModule { }
