import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { SessionService } from './session.service';
import { Message } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  private apiUrl = 'http://localhost:8100/api/users';

  createUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.apiUrl, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  loginUser(email: string): Observable<any> {
    console.log(email);
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.apiUrl}/email`, {
      params,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getWorkers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/workers` , {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    })
  }


  getNotification(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/notifications/${this.sessionService.getToken('id')}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  sendNotificationAll(message: Message) {
    console.log(`${this.apiUrl}/notifications/all`);

    this.http
      .post(`${this.apiUrl}/notifications/all`, message, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  sendNotificationWorker(message: Message) {
    console.log(`${this.apiUrl}/notifications/worker`);

    this.http
      .post(`${this.apiUrl}/notifications/worker`, message, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  sendNotificationResident(message: Message) {
    console.log(`${this.apiUrl}/notifications/resident`);

    this.http
      .post(`${this.apiUrl}/notifications/resident`, message, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  sendNotificationId(message: Message) {
    console.log(`${this.apiUrl}/notifications/${this.sessionService.getToken('id')}`);

    this.http
      .post(`${this.apiUrl}/notifications/${this.sessionService.getToken('id')}`, message, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
