import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { PostCar } from './components/post-car/post-car';

const routes: Routes = [
  {path:"dashboard", component:AdminDashboard},
  {path:"car", component:PostCar}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
