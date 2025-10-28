import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing-module';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';


@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerDashboard
  ]
})
export class CustomerModule { }
