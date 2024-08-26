import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { noAuthGuard } from './core/guards/NoAuth.guard';

export const routes: Routes = [
    {path: "login", component:LoginPageComponent, canActivate:[noAuthGuard]},
    {path: "home", component:HomePageComponent},
    {path: "**", redirectTo:"/home"}
];
