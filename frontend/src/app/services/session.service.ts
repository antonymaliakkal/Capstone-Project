import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  login(username: string , firstName: string , role: string , lastName: string , location: string , id:string): void {
      localStorage.setItem('logged' , 'true')
      localStorage.setItem('username' , username);
      localStorage.setItem('firstName' , firstName);
      localStorage.setItem('lastName' , lastName);
      localStorage.setItem('location',location)
      localStorage.setItem('role' , role)
      localStorage.setItem('id',id);
  }

  logout(): void {
    localStorage.setItem('logged' , 'false')
    localStorage.setItem('username' , '');
    localStorage.setItem('firstName' , '');
    localStorage.setItem('lastName' , '');
    localStorage.setItem('location','');
    localStorage.setItem('role' , '');
    localStorage.setItem('id' , '');
  } 

  getToken(key:string): string | null{
    return localStorage.getItem(key);
  }

  intialize(): void {
    localStorage.setItem('logged' , 'false');
    localStorage.setItem('username' , '');
    localStorage.setItem('firstName' , '');
    localStorage.setItem('lastName' , '');
    localStorage.setItem('location','');
    localStorage.setItem('role' , '');
    localStorage.setItem('id' , '');
  } 

}
