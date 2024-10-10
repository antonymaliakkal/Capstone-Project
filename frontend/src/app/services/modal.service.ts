import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // isModalOpen = new BehaviorSubject<boolean>(false);
  // isModalOpen$ = this.isModalOpen.asObservable();
  
  // status = new BehaviorSubject<boolean>(true);
  // status$ = this.status.asObservable();


  private showLoginModal = new BehaviorSubject<boolean>(false);
  private showSignupModal = new BehaviorSubject<boolean>(false);

  showLogin$ = this.showLoginModal.asObservable();
  showSignup$ = this.showSignupModal.asObservable();

  openLogin() {
    console.log('started openLogin')
    this.showLoginModal.next(true);
    this.showSignupModal.next(false); // Close signup if it's open
    console.log('started openLogin')
  }

  openSignup() {
    console.log('started openSignup')
    this.showSignupModal.next(true);
    this.showLoginModal.next(false); // Close login if it's open
    console.log('closed openSignup')
  }

  closeModals() {
    this.showLoginModal.next(false);
    this.showSignupModal.next(false);
  }


  // openModal() {
  //   console.log('MODAL')
  //   this.isModalOpen.next(true);
  // }

  // closeModal() {
  //   this.isModalOpen.next(false);
  // }

  // getStatus() {
  //   return this.status.value;
  // }

  // changeStatus() {
  //   console.log(this.status.value)
  //   this.status.next(!this.status.value);
  // }


}
