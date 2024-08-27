import { SearchParams } from './../../core/interfaces/searchParams';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../core/services/session/session.service';
import { Router } from '@angular/router';
import { SearchService } from '../../core/services/search/search.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn:Boolean=false;
  userName:String='';
  searchForm!:FormGroup;

  constructor(
    private sessionService:SessionService, 
    private router:Router, 
    private searchService: SearchService,
    private fb:FormBuilder){
  }

  ngOnInit():void{
    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    })
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

  onSearch(){
    const params:SearchParams = {
      name:this.searchForm.controls['query'].value
    }
    this.searchService.setSearchParams(params);
    this.router.navigateByUrl("/home");
  }
}
