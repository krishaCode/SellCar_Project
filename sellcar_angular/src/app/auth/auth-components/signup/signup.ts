import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
// ng-zorro imports
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzSpinModule, NzGridModule, NzFormModule, NzInputModule, NzButtonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  signupForm: FormGroup;
  isSpinning = false; // used by template

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator.bind(this)]]
    });
  }

  // Validator to check confirmPassword matches password
  confirmationValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value) {
      return { required: true };
    }

    if (this.signupForm && control.value !== this.signupForm.get('password')?.value) {
      return { confirm: true };
    }

    return null;
  }

  register(){
    console.log(this.signupForm.value);
  }

}
