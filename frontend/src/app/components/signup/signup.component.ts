import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserserviceService } from '../../services/userservice.service';
import { User } from '../../models/user.model';
import { FormBuilder, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  

  
  data = [];
  
  private formBuilder = inject(FormBuilder);
  registrationForm: FormGroup = this.formBuilder.group({
    username : '',
    email : '',
    password : '',
    firstName : '',
    lastName : '',
    phoneNumber : '',
    location : '',
    role : ''
  });


  constructor(public modalService:ModalService , private userService:UserserviceService , private sessionService:SessionService , private router: Router) {
   }
  
  onSubmit() {
    if (this.registrationForm.valid) {
        const user: User = this.registrationForm.value;

        this.userService.createUser(user).subscribe(
            (response) => {
                console.log('User registered successfully!', response);
                this.sessionService.login(response.username , response.firstName , response.role , response.lastName , response.location , response.userid)
                if(response.role === 'ADMIN') {
                  this.router.navigate(['/admin'])
                }
                else if(response.role === 'RESIDENT') {
                  this.router.navigate(['/resident'])
                }
            },
            (error) => {
                console.error('Error registering user', error);
            }
        );
    }
}

  createuser(): void {
      console.log('clicked')
      console.log(this.data)
  }


  openLogin(event: Event) {
    event.stopPropagation();
    this.modalService.closeModals();
    this.modalService.openLogin();
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.modalService.closeModals();
    }
  }




}
