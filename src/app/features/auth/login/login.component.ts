import { ErrorResponse } from './../../../core/interfaces/errorResponse';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../core/interfaces/auth/loginRequest';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  @Output() changeComponent = new EventEmitter<string>();
  loginForm!:FormGroup;
  error:String = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth:AuthService
  ){

  }
  
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  login(){
    const credentials:LoginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    } 
    
    this.auth.login(credentials).subscribe({
      error: (errorData:HttpErrorResponse) => {
        this.error = errorData.error.error;
      },
      complete: () => {
        this.route.navigateByUrl('/home')
        this.loginForm.reset();
      }
    })
  }

  validate(field:string, error:string):void{
    return this.loginForm.controls[field].getError(error) &&
      this.loginForm.controls[field].touched;
  }

  goToRegister(){
    this.changeComponent.emit('register');
  }
}
