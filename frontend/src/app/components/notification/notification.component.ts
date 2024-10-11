import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  date: Date;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private userService:UserserviceService){}

  ngOnInit() {

    this.userService.getNotification().subscribe(
      (response) => {
        for(const key in response) {
          this.notifications.push(response[key]);
        }
        this.notifications.reverse();
      }
    )

    console.log(this.notifications)
  }
}
