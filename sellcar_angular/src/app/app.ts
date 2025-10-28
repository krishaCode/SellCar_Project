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
        this.updateTitle((event as NavigationEnd).urlAfterRedirects || (event as NavigationEnd).url);
      }
    });
  }

  logout() {
    Storage.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Update the navbar title based on the current route.
   */
  private updateTitle(url: string) {
    if (!url) {
      this.title.set('Car Rental Service');
      return;
    }

    if (url.startsWith('/login')) {
      this.title.set('Login - Car Rental Service');
      return;
    }

    if (url.startsWith('/register') || url.startsWith('/signup')) {
      this.title.set('Sign Up - Car Rental Service');
      return;
    }

    // admin dashboard
    if (url.startsWith('/modules/admin') || url.startsWith('/admin')) {
      this.title.set('Admin Dashboard - Car Rental Service');
      return;
    }

    // customer dashboard
    if (url.startsWith('/modules/customer') || url.startsWith('/customer')) {
      this.title.set('Customer Dashboard - Car Rental Service');
      return;
    }

    // default / home and other pages
    this.title.set('Car Rental Service');
  }
}
