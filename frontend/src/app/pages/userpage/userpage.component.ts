import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MapComponent } from "../../components/map/map.component";
import { ReportComponent } from "../../components/report/report.component";
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "../../components/profile/profile.component";
import { NotificationsComponent } from "../../components/notification/notification.component";
import { EducationComponent } from "../../components/education/education.component";

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NavbarComponent, MapComponent, ReportComponent, CommonModule, ProfileComponent, NotificationsComponent, EducationComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {

  selectedComponet: string = '';

  onMenuItemSelected(component:  string) {
    console.log(component)
    this.selectedComponet = component
  }

}
