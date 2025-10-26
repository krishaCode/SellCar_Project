import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  loginForm: FormGroup;
  isSpinning = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private message: NzMessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('login success', res);
        this.isSpinning = false;
        // navigate to home or dashboard
        this.router.navigate(['/']);

        if (res && res.userId !== null && res.userId !== undefined) {
          const user = {
            id: res.userId,
            role: res.userRole,
          };
          Storage.saveUser(user);
          Storage.saveToken(res.jwt);

          if (Storage.isAdminLoggedIn && Storage.isAdminLoggedIn()) {
            this.router.navigate(['/admin']);
          } else if (Storage.isCustomerLoggedIn && Storage.isCustomerLoggedIn()) {
            this.router.navigate(['/customer']);
          } else {
            this.message.error('Unknown user role. Please contact support.');
          }
        }
      },
      error: (err: any) => {
        console.error('login error', err);
        this.isSpinning = false;
        this.message.error('Login failed. Please try again.');
      }
    });
  }

  
}
