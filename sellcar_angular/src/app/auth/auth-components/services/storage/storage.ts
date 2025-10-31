import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class Storage {
  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(){
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(){
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(){
    const user = this.getUser();
    if (user == null) return "";
    const role = user.role;
    // Normalize numeric roles from backend: 0 -> admin, 1 -> customer
    if (typeof role === 'number') {
      if (role === 0) return 'admin';
      if (role === 1) return 'customer';
      return String(role);
    }
    if (typeof role === 'string') {
      if (role === '0') return 'admin';
      if (role === '1') return 'customer';
      return role;
    }
    return String(role);
    }

    static isAdminLoggedIn(): boolean {
      if(this.getToken()==null) return false;
      const role: string = this.getUserRole();
      return role === "admin";
    }

    static isCustomerLoggedIn(): boolean {
      if(this.getToken()==null) return false;
      const role: string = this.getUserRole();
      return role === "customer";
    }

      /**
       * Clear stored auth data (token and user).
       */
      static logout(): void {
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(USER);
      }
  }
