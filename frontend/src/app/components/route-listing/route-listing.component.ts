import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TruckService } from '../../services/truck.service';
import { SessionService } from '../../services/session.service';

interface Action {
  id: number;
  inde: number;
  type: string;
  startTime: number;
  duration: number;
  jobIndex: number;
  waypointIndex: number;
}

interface Route {
  id: number;
  type: string;
  geometry: string;
  distance: number;
  startTime: number;
  endTime: number;
  mode: string;
  actions: Action[];
}

interface TruckData {
  truckId: number;
  truckNumber: string;
  assignedRoute: Route;
}


@Component({
  selector: 'app-route-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-listing.component.html',
  styleUrl: './route-listing.component.css'
})
export class RoutesListingComponent implements OnInit{


  truckData: any;

  constructor(private trucService:TruckService,private sessionService:SessionService) {  }

  ngOnInit(): void {
    this.fetchTruckRoute();
    
  }


  fetchTruckRoute() {
    this.trucService.getTruckRoute(this.sessionService.getToken('id') as string).subscribe(
      (response) => {
        console.log(response);
        this.truckData = response;
        console.log(this.truckData)
        this.parse();
      }
      
    )
    console.log(this.truckData)
    
  }

  parse() {
    console.log('hiii')
    const geo = JSON.parse(this.truckData.assignedRoute.geometry)
    console.log('geo',geo) 
    geo.forEach((element:any) => {
      const startPoint = element[0];
      const endPoint = element[1];
      
      console.log(`Start Point: Longitude ${startPoint[0]}, Latitude ${startPoint[1]}`);
      console.log(`End Point: Longitude ${endPoint[0]}, Latitude ${endPoint[1]}`);
    
    })
  }


}