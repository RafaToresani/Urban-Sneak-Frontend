import { Component } from '@angular/core';
import { SessionService } from '../../core/services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn:Boolean=false;
  userName:String='';

  constructor(private sessionService:SessionService, private router:Router){
    this.checkLogin();
  }

  checkLogin(){
    this.sessionService.userLoginOn.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (this.isLoggedIn) {
        this.sessionService.userData.subscribe(userData => {
          this.userName = `${userData.firstName} ${userData.lastName}`;
        });
      }else{
        this.userName = '';
      }
    });
  }

  navigateTo(route:String):void{
    this.router.navigate([route]);
  }

  logout():void{
    this.sessionService.clearUserSession();
  }
}
