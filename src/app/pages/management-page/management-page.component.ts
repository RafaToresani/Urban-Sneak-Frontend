import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './management-page.component.html',
  styleUrl: './management-page.component.css'
})
export class ManagementPageComponent {

  constructor(private router:Router){
  }

  navigateTo(url:String){
    this.router.navigateByUrl(`/management/${url}`)
  }
}
