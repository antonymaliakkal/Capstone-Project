// report-enquiry.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoutePlanner } from '../../services/route-planner.service';

enum FormType {
  Report = 'report',
  Enquiry = 'enquiry'
}


interface Location {
  coordinates: [number, number]; // Tuple for [longitude, latitude]
}

interface Agent {
  start_location: Location; // Now a single Location object
  end_location: Location; // Now a single Location object
  pickup_capacity: number;
}

interface Job {
  location: Location; // Now a single Location object
  duration: number;
  pickup_amount: number;
}

interface RequestBody {
  mode: string;
  agents: Agent[];
  jobs: Job[];
}


interface ReportForm {
  binId: string;
  incidentType: string;
  description: string;
  image: File | null;
}

interface EnquiryForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
    templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  FormType = FormType;
  selectedFormType: FormType = FormType.Report;

  reportForm: ReportForm = {
    binId: '',
    incidentType: '',
    description: '',
    image: null
  };

  enquiryForm: EnquiryForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private routeplanenr:RoutePlanner) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reportForm.image = file;
    }
  }

  // submitReport() {
  //   this.planRoute();
  //   console.log('Submitting report:', this.reportForm);
  //   // Here you would typically send the data to your backend service
  //   // You may want to use FormData to handle the file upload
  //   alert('Report submitted successfully!');
  //   this.resetForms();
  // }


  // public planRoute() {
  //   const body = {
  //     mode: "truck",
  //     agents: [
  //       { start_location: [77.6097223, 12.97357] , end_location: [77.60766336909577, 12.965021349675533], pickup_capacity: 5000 },
  //       { start_location: [77.6097223, 12.97357] , end_location: [77.60766336909577, 12.965021349675533] , pickup_capacity: 8000 },
  //       { start_location: [77.6140413, 12.9732807] , end_location: [77.60766336909577, 12.965021349675533] , pickup_capacity: 5000 },
  //       { start_location: [77.6140413, 12.9732807] , end_location:  [77.60766336909577, 12.965021349675533] , pickup_capacity: 5000 },
  //       { start_location: [77.6140413, 12.9732807] , end_location:  [77.60766336909577, 12.965021349675533] , pickup_capacity: 5000 },
  //     ],
  //     jobs: [
  //       { location: [77.61627557552586, 12.971531800000001] , duration: 300, pickup_amount: 60 },
  //       { location: [77.61531252513309, 12.972179] , duration: 300, pickup_amount: 230 },
  //       { location:  [77.61368323469134, 12.97215365] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.6151954110558, 12.972900450000001] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.61379085068103, 12.97244005] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.6178821, 12.97207] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.61730425, 12.97265814967634] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.61317494656308, 12.97437864967652] , duration: 300, pickup_amount: 60 },
  //       { location:  [77.61267213733552, 12.974457849676522] , duration: 300, pickup_amount: 100 },
  //       { location:  [77.6127759, 12.974718199676552] , duration: 300, pickup_amount: 230 },
  //       { location:  [77.6137158, 12.97447679967653] , duration: 300, pickup_amount: 230 },
  //     ],
  //   };
  
  //   this.routeplanenr.planRoute(body).subscribe(
  //     response => {
  //       console.log('Route response:', response);
  //     },
  //     error => {
  //       console.error('Error planning route:', error);
  //     }
  //   );
  // }
  


  submitEnquiry() {
    console.log('Submitting enquiry:', this.enquiryForm);
    // Here you would typically send the data to your backend service
    alert('Enquiry submitted successfully!');
    this.resetForms();
  }

  private resetForms() {
    this.reportForm = {
      binId: '',
      incidentType: '',
      description: '',
      image: null
    };
    this.enquiryForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}