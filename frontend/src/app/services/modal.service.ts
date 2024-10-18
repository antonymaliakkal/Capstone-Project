import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showLoginModal = new BehaviorSubject<boolean>(false);
  private showSignupModal = new BehaviorSubject<boolean>(false);

  showLogin$ = this.showLoginModal.asObservable();
  showSignup$ = this.showSignupModal.asObservable();


  constructor(private loadingService:LoadingService) {  }

  openLogin() {
    console.log('started openLogin')
    this.loadingService.show();

    setTimeout( () => {
      this.showSignupModal.next(false); // Close signup if it's open
      this.showLoginModal.next(true);
      this.loadingService.hide();
      console.log('closed openLogin')
    } , 500 )

  
  }

  openSignup() {
    console.log('started openSignup')
    this.showLoginModal.next(false); // Close login if it's open
    this.showSignupModal.next(true);
    console.log('closed openSignup')
  }

  closeModals() {
    this.showLoginModal.next(false);
    this.showSignupModal.next(false);
  }


}
