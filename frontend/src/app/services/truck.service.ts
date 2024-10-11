import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../models/truck.model';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  private apiUrl = 'http://localhost:8300/trucks'
  
  constructor( private http:HttpClient ) { }

  addTruck(truck:Truck): Observable<any> {
    return this.http.post(this.apiUrl , truck ,  {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
  }

  getTruckRoute(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}` , {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
  }

  getTruck(): Observable<any> {
    return this.http.get(`${this.apiUrl}` , {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    })
  }

}
