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
import { AuthState } from '../../auth-state';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private authState: AuthState) {
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
        if (res) {
          const id = res.userId ?? res.userID ?? null;
          const user = {
            id,
            role: (res.userRole ?? res.UserRole ?? null),
          };

          Storage.saveToken(res.token ?? res.jwt ?? '');
          Storage.saveUser(user);

          // Normalize role string and broadcast it to App via AuthState
          const roleRaw = (res.userRole ?? res.UserRole ?? user.role ?? '');
          const role = String(roleRaw).toLowerCase();
          // update auth state so App/navbar reacts immediately
          this.authState.setRole(role);

          if (role === 'admin' || role === '0') {
            // navigate admin to Post Car page after login
            this.router.navigate(['/admin', 'car']);
          } else if (role === 'customer' || role === '1') {
            this.router.navigate(['/customer', 'dashboard']);
          } else {
            // fallback: try Storage helpers
            if (Storage.isAdminLoggedIn()) {
              this.router.navigate(['/admin', 'car']);
            } else if (Storage.isCustomerLoggedIn()) {
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
