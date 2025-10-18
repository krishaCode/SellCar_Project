import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminRoutingModule } from "./modules/admin/admin-routing-module";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, AdminRoutingModule]
})
export class App {
  protected readonly title = signal('sellcar_angular');
}
