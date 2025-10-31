import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Simple auth state holder so components can react to role/login changes.
 */
@Injectable({ providedIn: 'root' })
export class AuthState {
  private roleSubject = new BehaviorSubject<string | null>(null);

  readonly role$: Observable<string | null> = this.roleSubject.asObservable();

  setRole(role: string | null) {
    this.roleSubject.next(role);
  }

  clear() {
    this.roleSubject.next(null);
  }
}
