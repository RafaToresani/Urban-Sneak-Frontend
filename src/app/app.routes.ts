import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { noAuthGuard } from './core/guards/NoAuth.guard';
import { ManagementPageComponent } from './pages/management-page/management-page.component';
import { managerGuard } from './core/guards/Manager.guard';
import { ProductDashboardComponent } from './features/dashboards/product-dashboard/product-dashboard.component';
import { ManagerDashboardComponent } from './features/dashboards/manager-dashboard/manager-dashboard.component';
import { OrderDashboardComponent } from './features/dashboards/order-dashboard/order-dashboard.component';
import { CustomerDashboardComponent } from './features/dashboards/customer-dashboard/customer-dashboard.component';

export const routes: Routes = [
    {path: "login", component:LoginPageComponent, canActivate:[noAuthGuard]},
    {path: "home", component:HomePageComponent},
    {path: 'management', component:ManagementPageComponent, canActivate:[managerGuard], children: [
        {path: "products", component:ProductDashboardComponent},
        {path: "managers", component:ManagerDashboardComponent},
        {path: "customers", component:CustomerDashboardComponent},
        {path: "orders", component:OrderDashboardComponent}
    ]},
    {path: "**", redirectTo:"/home"}
];
