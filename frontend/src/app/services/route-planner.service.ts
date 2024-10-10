import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Location {
  coordinates: [number, number]; // Tuple for [longitude, latitude]
}

export interface Agent {
  "start_location": [number , number];
  "end_location" : [ number , number ];
  "pickup_capacity": number;
}

export interface Job {
  "location": [number , number];
  "duration": number;
  "pickup_amount": number;
}

export interface RequestBody {  
  "mode": string;
  "agents": Agent[];
  "jobs": Job[];
}

interface RouteResponse {
  type: string;
  features: Array<{
    type: string;
    properties: any;
    geometry: {
      type: string;
      coordinates: number[][];
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class RoutePlanner {
  private apiUrl = 'https://api.geoapify.com/v1/routeplanner';
  private apiKey = '4355b78d0441435c91f4929c76707da5'; // Replace with your actual API key

  constructor(private http: HttpClient) {}




  public planRoute(body: RequestBody): Observable<any> {
    
    console.log(body);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(body);
    return this.http.post(`${this.apiUrl}?apiKey=${this.apiKey}`, body, { headers });


    // return this.http.post<RouteResponse>(`${this.apiUrl}?apiKey=${this.apiKey}`, body, { headers })
    //   .pipe(
    //     map(response => response.features.map(feature => feature.geometry.coordinates))
    //   );
  }
}