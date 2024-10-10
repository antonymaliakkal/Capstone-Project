import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface RoutePoint {
  id: number;
  address: string;
  status: 'pending' | 'completed' | 'skipped';
}

interface Route {
  id: number;
  workerId: number;
  workerName: string;
  date: Date;
  points: RoutePoint[];
}


@Component({
  selector: 'app-collection-route-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-route-viewer.component.html',
  styleUrl: './collection-route-viewer.component.css'
})
export class CollectionRouteViewerComponent implements OnInit {
  routes: Route[] = [];
  filteredRoutes: Route[] = [];

  ngOnInit() {
    // Mock data - replace with actual API call
    this.routes = [
      {
        id: 1,
        workerId: 101,
        workerName: 'John Doe',
        date: new Date('2023-01-15'),
        points: [
          { id: 1, address: '123 Main St', status: 'completed' },
          { id: 2, address: '456 Elm St', status: 'completed' },
          { id: 3, address: '789 Oak St', status: 'pending' },
        ]
      },
      {
        id: 2,
        workerId: 102,
        workerName: 'Jane Smith',
        date: new Date('2023-01-16'),
        points: [
          { id: 4, address: '321 Pine St', status: 'completed' },
          { id: 5, address: '654 Maple St', status: 'skipped' },
          { id: 6, address: '987 Cedar St', status: 'pending' },
        ]
      }
    ];
    this.filteredRoutes = this.routes;
  }

  filterRoutes(event: Event) {
    const filterDate = new Date((event.target as HTMLInputElement).value);
    this.filteredRoutes = this.routes.filter(route => 
      route.date.toDateString() === filterDate.toDateString()
    );
  }
}
