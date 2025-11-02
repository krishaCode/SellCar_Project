
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, NgIf, ReactiveFormsModule, NzSpinModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, NzLayoutModule],
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

  postCarForm!: FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      type: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      color: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  postCar() {
    console.log("Post Car form submitted:", this.postCarForm.value);
    const formData = new FormData();
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('year', this.postCarForm.get('year')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    console.log("FormData prepared for submission:", formData);
  }

  /** Handle file selection from the upload input */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagepreview = (e.target?.result as string) || '';
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imagepreview = (e.target?.result as string) || '';
    }
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  /** Remove currently selected image */
  removeSelected() {
    this.selectedFile = null;
    this.imagepreview = '';
  }



}