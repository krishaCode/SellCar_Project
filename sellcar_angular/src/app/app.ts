import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminRoutingModule } from "./modules/admin/admin-routing-module";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AdminRoutingModule]
})
export class App {
  protected readonly title = signal('sellcar_angular');
}
