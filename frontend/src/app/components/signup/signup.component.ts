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
  loginForm: FormGroup = this.formBuilder.group({
    email : '',
    password : '',
  });


  constructor(public modalService:ModalService , private userService:UserserviceService , private sessionService:SessionService , private router: Router) {
   }

  onSubmit() {
    if (this.loginForm.valid) {
        const user: User = this.loginForm.value;

        this.userService.loginUser(user.email).subscribe(
          (response) => {
            console.log(response);
            if(response.password === user.password){
              this.sessionService.login(response.username , response.firstName , response.role , response.lastName , response.location , response.userid)
              if(response.role === 'ADMIN') {
                          this.router.navigate(['/admin'])
                        }
                        else if(response.role === 'RESIDENT') {
                          this.router.navigate(['/resident'])
                        }
                        else if(response.role === 'WORKER') {
                          this.router.navigate(['/worker'])
                        }
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

  openLogin() {
    this.modalService.openSignup();
  }

  closeModal() {
    this.modalService.closeModals();
  }




}
