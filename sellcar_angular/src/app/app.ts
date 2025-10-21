import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminRoutingModule } from "./modules/admin/admin-routing-module";
import { NzFormModule } from "ng-zorro-antd/form";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [AdminRoutingModule, NzFormModule]
})
export class App {
  protected readonly title = signal('sellcar_angular');
}
