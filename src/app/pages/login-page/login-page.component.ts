import { Component } from '@angular/core';
import { LoginComponent } from "../../features/auth/login/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RegisterComponent } from "../../features/auth/register/register.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent, ReactiveFormsModule, CommonModule, RegisterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  currentComponent: string = 'login';

  setCurrentComponent(component: string) {
    this.currentComponent = component;
  }
}
