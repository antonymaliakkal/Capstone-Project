import { Component } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { BinManagementComponent } from "../../components/bin-management/bin-management.component";
import { MessagingComponent } from "../../components/messaging/messaging.component";
import { ReportManagementComponent } from "../../components/report-management/report-management.component";
import { CollectionRouteViewerComponent } from "../../components/collection-route-viewer/collection-route-viewer.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { CreateTruckComponent } from "../../components/create-truck/create-truck.component";

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [MapComponent, NavbarComponent, SidebarComponent, BinManagementComponent, MessagingComponent, ReportManagementComponent, CollectionRouteViewerComponent, ProfileComponent, CreateTruckComponent],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})
export class AdminpageComponent {

  
  selectedComponet: string = '';

  onMenuItemSelected(component:  string) {
    console.log(component)
    this.selectedComponet = component
  }

}
