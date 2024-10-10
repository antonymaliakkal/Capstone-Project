import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';
import { Observable } from 'rxjs';
import { Message } from '../../models/notification.model';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css',
})
export class MessagingComponent {
  notificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSession: UserserviceService
  ) {
    this.notificationForm = this.fb.group({
      recipient: ['all', Validators.required],
      individualRecipient: [''],
      message: ['', Validators.required],
      type: ['info'],
    });

    this.notificationForm.get('recipient')?.valueChanges.subscribe((value) => {
      if (value === 'individual') {
        this.notificationForm
          .get('individualRecipient')
          ?.setValidators([Validators.required]);
      } else {
        this.notificationForm.get('individualRecipient')?.clearValidators();
      }
      this.notificationForm
        .get('individualRecipient')
        ?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.notificationForm.valid) {
      console.log('Sending notification:', this.notificationForm.value);
      // Here you would typically send the notification data to your backend

      const message: Message = {
        message: this.notificationForm.value.message,
        type: this.notificationForm.value.type,
      };
      
      if (this.notificationForm.value.recipient === 'all') {
        this.userSession.sendNotificationAll(message);
      } else if (this.notificationForm.value.recipient === 'worker') {
        this.userSession.sendNotificationWorker(message);
      } else if (this.notificationForm.value.recipient === 'resident') {
        this.userSession.sendNotificationResident(message);
      } else if (this.notificationForm.value.recipient === 'individual') {
        this.userSession.sendNotificationId(message);
      }

      this.notificationForm.reset({ recipient: 'all' });
    }
  }
}


