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
    if(user == null) return "";
      return user.role;
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
  }
