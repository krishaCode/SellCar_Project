import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthService } from '../services/auth';
import { Storage } from '../services/storage/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSpinModule, NzGridModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm!: FormGroup;
  isSpinning: boolean= false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isSpinning = false;
        if (res && res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole ?? res.UserRole ?? null,
          };

          Storage.saveToken(res.token ?? res.jwt ?? '');
          Storage.saveUser(user);

          // Prefer using the role returned by the backend to decide navigation
          const role = (res.userRole ?? res.UserRole ?? '').toString().toLowerCase();
          if (role === 'admin') {
            // navigate to admin dashboard route
            this.router.navigate(['/admin', 'dashboard']);
          } else if (role === 'customer') {
            // navigate to customer dashboard route
            this.router.navigate(['/customer', 'dashboard']);
          } else {
            // Fallback: attempt to infer from stored data
            if (Storage.isAdminLoggedIn && Storage.isAdminLoggedIn()) {
              this.router.navigate(['/admin', 'dashboard']);
            } else if (Storage.isCustomerLoggedIn && Storage.isCustomerLoggedIn()) {
              this.router.navigate(['/customer', 'dashboard']);
            } else {
              console.error('Unknown user role');
            }
          }
        }
      },
      error: (err: any) => {
        console.error('login error', err);
        this.isSpinning = false;
      }
    });
  }

}
