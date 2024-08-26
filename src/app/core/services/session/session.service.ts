import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth/authResponse';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>({
    firstName: '',
    lastName: '',
    token: '',
    role: ''
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeSession();
  }

  private initializeSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      this.currentUserLoginOn.next(token != null);
      this.currentUserData.next({
        firstName: sessionStorage.getItem('firstName') || '',
        lastName: sessionStorage.getItem('lastName') || '',
        token: sessionStorage.getItem('token') || '',
        role: sessionStorage.getItem('role') || ''
      });
    }
  }

  setUserSession(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('firstName', response.firstName);
      sessionStorage.setItem('lastName', response.lastName);
      sessionStorage.setItem('role', response.role);
      this.currentUserData.next(response);
      this.currentUserLoginOn.next(true);
    }
  }

  clearUserSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('firstName');
      sessionStorage.removeItem('lastName');
      sessionStorage.removeItem('role');
      this.currentUserLoginOn.next(false);
      this.currentUserData.next({
        firstName: '',
        lastName: '',
        token: '',
        role: ''
      });
    }
  }

  get userData(): Observable<AuthResponse> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  isAuth(): boolean {
    return this.currentUserLoginOn.value;
  }

}
