import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { WokerpageComponent } from './pages/wokerpage/wokerpage.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { EducationComponent } from './components/education/education.component';

export const routes: Routes = [
    { path: 'home' , component: HomepageComponent },
    { 
        path : 'admin' , 
        component: AdminpageComponent,
        canActivate: [authGuardGuard],
        data : { roles: ['ADMIN'] } 
    },
    { 
        path: 'worker' , 
        component:WokerpageComponent,
        canActivate: [authGuardGuard],
        data : { roles: ['WORKER'] }
    },
    { 
        path: 'resident' , 
        component: UserpageComponent,
        canActivate: [authGuardGuard],
        data : { roles: ['RESIDENT'] }
     },
     {
        path : 'education',
        component: EducationComponent
     }
];
 