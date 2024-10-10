import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MapComponent } from "../../components/map/map.component";
import { BinCollectionFormComponent } from "../../components/bin-collection-form/bin-collection-form.component";
import { NotificationsComponent } from "../../components/notification/notification.component";
import { RoutesListingComponent } from "../../components/route-listing/route-listing.component";
import { BinManagementComponent } from "../../components/bin-management/bin-management.component";
import { MessagingComponent } from "../../components/messaging/messaging.component";
import { ReportManagementComponent } from "../../components/report-management/report-management.component";
import { CollectionRouteViewerComponent } from '../../components/collection-route-viewer/collection-route-viewer.component';
import { ProfileComponent } from "../../components/profile/profile.component";

@Component({
  selector: 'app-wokerpage',
  standalone: true,
  imports: [CollectionRouteViewerComponent, SidebarComponent, NavbarComponent, MapComponent, BinCollectionFormComponent, NotificationsComponent, RoutesListingComponent, BinManagementComponent, MessagingComponent, ReportManagementComponent, ProfileComponent],
  templateUrl: './wokerpage.component.html',
  styleUrl: './wokerpage.component.css'
})
export class WokerpageComponent {

  selectedComponet: string = '';

  onMenuItemSelected(component:  string) {
    console.log(component)
    this.selectedComponet = component
  }

}
