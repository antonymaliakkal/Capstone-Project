import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { SessionService } from './services/session.service';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { LoadingService } from './services/loading.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    LoadingAnimationComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  loading$ : Observable<boolean>
  private routerSubscription: Subscription | undefined;

  constructor(
    private sessionService: SessionService,
    private loadingService: LoadingService,
    private router: Router
  ) {

    this.loading$ = loadingService.loading$;
    
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    initFlowbite();
    console.log('app.component.ts ngOnInit')
    this.routerSubscription = this.router.events.subscribe(event => {
      // console.log('first if')
      if (event instanceof NavigationStart) {
        console.log('second if')
        this.loadingService.show();
        setTimeout(() => {
          // Data loaded
          console.log('2 seconds')
          this.loadingService.hide();
        }, 10000);
    
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        this.loadingService.hide();
      }
    });


    if (this.sessionService.getToken('logged')) {
      return;
    }
    this.sessionService.intialize();
  }
}
