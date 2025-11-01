
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, NgIf, NzSpinModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule],
  templateUrl: './post-car.html',
  styleUrls: ['./post-car.css']
})
export class PostCar {

  // minimal fields used by the template to satisfy template type-checking
  isSpinning: boolean = false;
  large: 'small' | 'default' | 'large' = 'large';
  selectedFile: File | null = null;
  imagepreview: string = '';
  listBrsnds: string[] = ['Toyota', 'Honda'];
  listOfType: string[] = ['Sedan', 'SUV'];
  listOfTransmission: string[] = ['Manual', 'Automatic'];
  listOfColor: string[] = ['Red', 'Blue', 'Black'];

}

