import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HomeComponent } from '../../components/home/home.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ 
    HeaderComponent,
    HomeComponent,
    MapComponent,
    SidebarComponent
   ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
