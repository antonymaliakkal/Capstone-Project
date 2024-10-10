import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  RoutePlanner,
  Agent,
  Job,
  RequestBody,
} from '../../services/route-planner.service';
import { CombinedRouteMapService } from '../../services/combined-route-map.service';
import { BinService } from '../../services/bin.service';
import { Bin } from '../../models/bin.model';
import { TruckService } from '../../services/truck.service';
import { SessionService } from '../../services/session.service';

interface Coordinate {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private route: L.Polyline | null = null;
  private http = inject(HttpClient);

  isLoading = false;

  coordinates = [{ value: '' }, { value: '' }, { value: '' }, { value: '' }];

  constructor(
    private combinedService: CombinedRouteMapService,
    private binService: BinService,
    private truckService: TruckService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.initMap();
    this.fixedMarkerIcon();
    this.initBin();

    if (this.sessionService.getToken('role') === 'WORKER') {
      this.getTruckRoute();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([8.533771, 76.882345], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private initBin(): void {
    this.binService.getBins().subscribe((bins: Bin[]) => {
      console.log(bins);
      bins.forEach((bin: Bin) => {
        this.addMarker(bin);
      });
      if (bins.length > 0) {
        const bounds = L.latLngBounds(
          bins.map((bin) => [bin.latitude, bin.longitude])
        );
        this.map.fitBounds(bounds);
      }
    });
  }

  private addMarker(bin: Bin): void {
    const marker = L.marker([bin.latitude, bin.longitude]).addTo(this.map);
    marker.bindPopup(`
      <b>Bin ID:</b> ${bin.id}<br>
      <b>Location:</b> ${bin.location}<br>
      <b>Waste Amount:</b> ${bin.wasteAmount}<br>
      <b>Status:</b> ${bin.status}<br>
      <b>Fill Level:</b> ${bin.fillLevel}<br>
      <b>Last Collection:</b> ${bin.lastCollectionDate}<br>
      <b>Next Collection:</b> ${bin.nextCollectionDate}
    `);
  }

  private fixedMarkerIcon() {
    const iconRetinaUrl = 'images/marker-icon-2x-red.png';
    const iconUrl = 'images/marker-icon-red.png';
    const shadowUrl = 'images/marker-shadow.png';

    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = iconDefault;
  }

  getRoute(validCoordinates: Coordinate[]) {

    this.isLoading = true; // loding the loading icon

    const waypoints = validCoordinates
      .map((coord) => `${coord.lng},${coord.lat}`)
      .join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${waypoints}?overview=full&geometries=geojson`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log(data)
        if (this.route) {
          this.map.removeLayer(this.route);
        }

        const routeCoordinates = data.routes[0].geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]]
        );
        this.route = L.polyline(routeCoordinates, { color: 'blue' }).addTo(
          this.map
        );
        this.map.fitBounds(this.route.getBounds());

        validCoordinates.forEach((coord, index) => {
          if (index == index) {
              const circle = L.circle([coord.lat, coord.lng], {
              radius: 20,         // Adjust the radius of the circle
              color: 'red',       // Circle border color
              fillColor: 'red',   // Circle fill color
              fillOpacity: 1,    // Circle fill opacity
            }).addTo(this.map);
        
            // Create a custom divIcon to display the index inside the circle
            const icon = L.divIcon({
              className: 'custom-div-icon',  // Custom CSS class for styling
              html: `<div style="text-align:center; color: white; font-weight: bold; font-size: 14px; 
                                 width: 20px; height: 20px;">${index + 1}</div>`,
              iconSize: [20, 20],  // Size of the icon (matches the circle)
              iconAnchor: [10, 10] // Anchor point (center of the icon)
            });
        
            // Add the index number inside the circle
            L.marker([coord.lat, coord.lng], { icon: icon }).addTo(this.map);
        


          }
        });

        this.isLoading = false; // closing the loading icon
      },
      error: (error) => {
        console.error('Error fetching route:', error);
        alert('An error occurred while fetching the route. Please try again.');
      },
    });
  }

  getTruckRoute(): void {
    this.truckService
      .getTruckRoute(this.sessionService.getToken('id') as string)
      .subscribe((response) => {
        if(response.assignedRoute == null){
          return;
        }
        const truckRoute = response;
        const geometry = JSON.parse(truckRoute.assignedRoute.geometry);

        console.log('FROM MAP : ', geometry);

        let validCoordinates: Coordinate[] = [];
        validCoordinates = this.reverseCoord(geometry);

        this.getRoute(validCoordinates);
      });
  }

  reverseCoord(geo: any): Coordinate[] {
    const coord: Coordinate[] = [];

    let start:any = {  }

    geo.forEach((element: any) => {
      const startPoint = element[0];
      const endPoint = element[1];

      const a = { lat: startPoint[1], lng: startPoint[0] };
      if (coord.length == 0) {
        coord.push({ lat: startPoint[1], lng: startPoint[0] });
        start = { lat: startPoint[1], lng: startPoint[0] };
        coord.push({ lat: endPoint[1], lng: endPoint[0] });
      } else if (
        JSON.stringify(coord[coord.length - 1]) === JSON.stringify(a)
      ) {
        coord.push({ lat: endPoint[1], lng: endPoint[0] });
      } else {
        coord.push({ lat: startPoint[1], lng: startPoint[0] });
        coord.push({ lat: endPoint[1], lng: endPoint[0] });
      }
    });

    coord.pop();

    console.log('coord : ', coord);
    return coord;
  }
}
