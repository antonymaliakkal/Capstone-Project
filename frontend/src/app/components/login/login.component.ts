import { Component, inject, model, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserserviceService } from '../../services/userservice.service';
import { User } from '../../models/user.model';
import { FormBuilder, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf , ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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

  openSignup() {
    this.modalService.openLogin();
  }

  closeModal() {
    this.modalService.closeModals();
  }


}
