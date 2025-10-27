import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Event, NavigationEnd } from '@angular/router';
import { AdminRoutingModule } from "./modules/admin/admin-routing-module";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Storage } from './auth/auth-components/services/storage/storage';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterModule, AdminRoutingModule, NzFormModule, NzLayoutModule, NzButtonModule, NzGridModule]
})
export class App {
  protected readonly title = signal('sellcar_angular');

  isCustomerLoggedIn: boolean = Storage.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = Storage.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isCustomerLoggedIn = Storage.isCustomerLoggedIn();
        this.isAdminLoggedIn = Storage.isAdminLoggedIn();
      }
    });
  }

  logout() {
    Storage.logout();
    this.router.navigate(['/login']);
  }
}
