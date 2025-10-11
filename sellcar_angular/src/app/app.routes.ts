import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './auth/auth-components/login/login';
import { Signup } from './auth/auth-components/signup/signup';

export const routes: Routes = [
  { path: "login", component: Login },
  { path: "register", component: Signup },
  { path: "admin", loadChildren: () => import('./modules/admin').then(e => e.AdminModule) },
  { path: "customer", loadChildren: () => import('./modules/customer').then(e => e.CustomerModule) },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
