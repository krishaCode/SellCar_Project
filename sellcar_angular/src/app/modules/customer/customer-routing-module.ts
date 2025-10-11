import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboard } from './components/customer-dashboard/customer-dashboard';

const routes: Routes = [
  {path:"dashboard", component:CustomerDashboard}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
