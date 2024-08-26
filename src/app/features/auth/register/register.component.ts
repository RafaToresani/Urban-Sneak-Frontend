import { CommonModule } from '@angular/common';
import { AuthService } from './../auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../core/interfaces/auth/registerRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Output() changeComponent = new EventEmitter<string>();
  form!:FormGroup;
  error:String = '';

  constructor(private fb:FormBuilder, private authService:AuthService){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }
  

  register(){
    const credentials:RegisterRequest = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      lastName: this.form.controls['lastName'].value,
      firstName: this.form.controls['firstName'].value,
      dni: this.form.controls['dni'].value
    }; 

    this.authService.register(credentials).subscribe({
      error: (errorData:HttpErrorResponse) => {
        this.error = errorData.error.error;
      },
      complete: () => {
        alert("Usuario creado")
        /* this.route.navigateByUrl('/home'); */
        this.form.reset();
      }
    })
  }

  validate(field:string, error:string):void{
    return this.form.controls[field].getError(error) &&
      this.form.controls[field].touched;
  }

  goToLogin(){
    this.changeComponent.emit('login');
  }
}
