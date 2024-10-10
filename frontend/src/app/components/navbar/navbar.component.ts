import { Component, Inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink,CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(public sessionService:SessionService , private router: Router) {}
  @Input() selectedComponent: string = '';


  isLoggedIn(): boolean {
    if(this.sessionService.getToken('logged') === "true"){
        return true;  
    }
    return false;
  }


  logout() {
    this.sessionService.logout();
    this.router.navigate(['home'])
  }

}
