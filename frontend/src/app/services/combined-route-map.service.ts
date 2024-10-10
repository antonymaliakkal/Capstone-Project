// import { Injectable } from '@angular/core';
// import { Observable, forkJoin, map } from 'rxjs';
// import { RoutePlanner, Agent, Job, RequestBody } from './route-planner.service';
// import { MapService } from './map.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CombinedRouteMapService {
//   constructor(
//     private routePlanner: RoutePlanner,
//     private mapService: MapService
//   ) {}

//   planAndMapRoute(agents: Agent[], jobs: Job[]): Observable<any> {
//     const routePlannerBody: RequestBody = {
//       mode: 'drive',
//       agents: agents,
//       jobs: jobs
//     };

//     // return this.routePlanner.planRoute(routePlannerBody);

//   //   return this.routePlanner.planRoute(routePlannerBody).pipe(
//   //     map(routes => routes.map(route => route.map(coord => coord.reverse()))), // Reverse coordinates for OpenRouteService
//   //     map(routes => routes.map(route => this.mapService.getRoute(route))),
//   //     map(routeObservables => forkJoin(routeObservables))
//   //   );
//   // }

//   return this.routePlanner.planRoute(routePlannerBody).pipe(
//     map((response: any) => {
//       // Extract features array
//       const features = response.features;
  
//       // For each feature, extract the MultiLineString coordinates
//       return features.map((feature: any) => {
//         const coordinates: number[][][] = feature.geometry.coordinates;
        
//         // Reverse the coordinates for compatibility (latitude and longitude switch)
//         return coordinates.map((line: number[][]) =>
//           line.map((coord: number[]): [number, number] => {
//             if (coord.length >= 2) {
//               return [coord[1], coord[0]]; // [lat, lng] format for Leaflet
//             }
//             throw new Error("Invalid coordinate: Expected at least 2 elements");
//           })
//         );
//       });
//     }),
//     map((routes: number[][][]) => {
//       // Call the MapService to get each route
//       return routes.map((route: number[][]) => this.mapService.getRoute(route));
//     }),
//     map((routeObservables: Observable<any>[]) => forkJoin(routeObservables))
//   );
  
// }}


import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RoutePlanner, Agent, Job, RequestBody } from './route-planner.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class CombinedRouteMapService {
  constructor(
    private routePlanner: RoutePlanner,
    private mapService: MapService
  ) {}

  planAndMapRoute(agents: Agent[], jobs: Job[]): Observable<any> {
    const routePlannerBody: RequestBody = {
      mode: 'drive',
      agents: agents,
      jobs: jobs
    };

    return this.routePlanner.planRoute(routePlannerBody).pipe(
      map((response: any) => {
        if (response && response.features && Array.isArray(response.features)) {
          return {
            ...response,
            features: response.features.map((feature: any) => ({
              ...feature,
              geometry: {
                ...feature.geometry,
                coordinates: this.reverseCoordinates(feature.geometry.coordinates)
              }
            }))
          };
        }
        return response; // Return original response if it doesn't match expected structure
      })
    );
  }

  private reverseCoordinates(coordinates: any): any {
    if (Array.isArray(coordinates)) {
      if (typeof coordinates[0] === 'number' && coordinates.length >= 2) {
        // Single coordinate pair
        return [coordinates[1], coordinates[0]];
      } else {
        // Nested array of coordinates
        return coordinates.map(coord => this.reverseCoordinates(coord));
      }
    }
    return coordinates; // Return as-is if not an array
  }
}