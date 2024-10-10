import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingbody',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingbody.component.html',
  styleUrl: './landingbody.component.css'
})
export class LandingbodyComponent {

  public services = [
    {
      name: 'Geocoding API',
      description: 'Pinpoint locations with given latitude and longitude',    
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Directions API',
      description: 'Provides a simple interface to get routing, narrative, and shapes',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Icons API',
      description: 'A variety of icon types including markers, circles, vias, and flags',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Static Map API',
      description: 'Create standard and retina static maps with locations, routes, etc.',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Search API',
      description: 'Allows spatial searches utilizing the MapQuest Data Manager',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Search Ahead API',
      description: 'Spatially-aware predictive search engine, commonly for "type ahead"',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Data Manager API',
      description: 'Store datasets in a spatially-aware database on MapQuest servers',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Place Search API',
      description: 'Find places, businesses, and other points of interest around the world',
      icon: 'images/card-img.jpg'
    },
    {
      name: 'Traffic API',
      description: 'Real-time traffic information related to traffic and flow',
      icon: 'images/card-img.jpg'
    }
  ];



}
