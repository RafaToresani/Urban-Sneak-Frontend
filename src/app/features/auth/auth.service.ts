import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../core/interfaces/auth/loginRequest';
import { AuthResponse } from '../../core/interfaces/auth/authResponse';
import { environment } from '../../core/environments/environment';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { SessionService } from '../../core/services/session/session.service';
import { RegisterRequest } from '../../core/interfaces/auth/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<AuthResponse> = new BehaviorSubject<AuthResponse>({
    firstName: '',
    lastName: '',
    token: '',
    role: ''
  });

  constructor(private http:HttpClient, private sessionService:SessionService) { }


  login(credentials:LoginRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.version}/auth/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.sessionService.setUserSession(response);
      }),
      map((response)=>{

        const auth : AuthResponse = {
          firstName: response.firstName,
          lastName: response.lastName,
          token: response.token,
          role: response.role
        }
        return auth;
      }),
      catchError((error:HttpErrorResponse)=> {
        //this.logout();
        return throwError(()=> error);
      })
    );
  }

  register(credentials:RegisterRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.version}/auth/sing-up`, credentials).pipe(
      tap((response:AuthResponse) => {
        this.sessionService.setUserSession(response);
      }),
      map((response)=>{
        const auth : AuthResponse = {
          firstName: response.firstName,
          lastName: response.lastName,
          token: response.token,
          role: response.role
        }
        return auth;
      })
    )
  }
}
