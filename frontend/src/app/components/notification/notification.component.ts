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

    // Mock data - replace with actual data fetching logic
    // this.notifications = [
    //   { id: 1, message: 'New route assigned', type: 'info', timestamp: new Date() },
    //   { id: 2, message: 'Bin #1234 is full', type: 'warning', timestamp: new Date(Date.now() - 3600000) },
    //   { id: 3, message: 'System maintenance scheduled', type: 'info', timestamp: new Date(Date.now() - 7200000) },
    //   { id: 4, message: 'Failed to update bin status', type: 'error', timestamp: new Date(Date.now() - 10800000) },
    // ];
  }
}
