import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ModalService } from '../../services/modal.service';
import { SignupComponent } from "../signup/signup.component";
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, SignupComponent,CommonModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  showLogin:boolean = true;
  private subscription?:Subscription;

  constructor(public modalService:ModalService , public sessionService:SessionService) {  

    this.modalService.openSignup()

  }
  
  checkLogged(): string {
    return this.sessionService.getToken('logged') as string;  
  }

  getRole(): string {
    let lowerStr: string = this.sessionService.getToken('role') as string;
    return lowerStr.toLowerCase();
  }

  openModal() {
    console.log('clicked')
    this.modalService.openSignup();
  }

}
