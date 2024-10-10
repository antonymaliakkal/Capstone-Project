import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup , ReactiveFormsModule,Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  location: string;
  photoUrl: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {



  user: User = {
    firstName: '',
    lastName: '',
    username: '',
    location: '',
    photoUrl: 'images/profile.jpeg'
  };

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder , private sessionService:SessionService) {
    
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  
  }

  ngOnInit(): void {
    // You would typically fetch the user data from a service here
    this.user.firstName = this.sessionService.getToken('firstName') as string;
    this.user.lastName = this.sessionService.getToken('lastName') as string;
    this.user.username = this.sessionService.getToken('username') as string;
    this.user.location = this.sessionService.getToken('location') as string;
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password change submitted', this.passwordForm.value);
      // Here you would typically call a service to change the password
      // For example: this.userService.changePassword(this.passwordForm.value)
    }
  }




}
