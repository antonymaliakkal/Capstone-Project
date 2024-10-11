import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

  wasteCategories = [
    {
      name: 'Recyclable Waste',
      description: 'Materials that can be reprocessed into new products.',
      items: ['Paper', 'Cardboard', 'Plastic bottles', 'Glass containers', 'Aluminum cans']
    },
    {
      name: 'Organic Waste',
      description: 'Biodegradable waste from food and plant materials.',
      items: ['Fruit and vegetable scraps', 'Coffee grounds', 'Eggshells', 'Yard trimmings']
    },
    {
      name: 'Electronic Waste',
      description: 'Discarded electrical or electronic devices.',
      items: ['Old computers', 'Mobile phones', 'Televisions', 'Printers']
    },
    {
      name: 'Hazardous Waste',
      description: 'Waste that poses substantial or potential threats to public health or the environment.',
      items: ['Batteries', 'Paint', 'Pesticides', 'Cleaning chemicals']
    }
  ];

  disposalTips = [
    'Rinse recyclable containers before disposing to prevent contamination.',
    'Flatten cardboard boxes to save space in recycling bins.',
    'Use separate bins for different types of waste in your home.',
    'Donate usable items instead of throwing them away.',
    'Take hazardous waste to designated collection points in your community.',
    'Compost organic waste when possible to reduce landfill usage.',
    'Properly dispose of masks and other PPE to prevent environmental contamination.'
  ];


}
