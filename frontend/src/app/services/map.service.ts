import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiKey = '5b3ce3597851110001cf6248e0862a64fc354b64b580615c84c38657';
  private apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';


  constructor( private http: HttpClient ) { }

  getRoute(coordinate: number[][]): Observable<any> {
    const body = { 
      coordinate: coordinate
    };
    
    return this.http.post(this.apiUrl , body, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : this.apiKey
      }
    });
  }



}
