import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface QueryReport {
  id: number;
  type: 'query' | 'report';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: Date;
}


@Component({
  selector: 'app-report-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-management.component.html',
  styleUrl: './report-management.component.css'
})
export class ReportManagementComponent {
  queriesReports: QueryReport[] = [];

  ngOnInit() {
    // Mock data - replace with actual API call
    this.queriesReports = [
      { id: 1, type: 'query', subject: 'Bin not emptied', description: 'The bin at 123 Main St was not emptied yesterday', status: 'open', createdAt: new Date('2023-01-01') },
      { id: 2, type: 'report', subject: 'Broken bin lid', description: 'The bin lid at 456 Elm St is broken', status: 'in-progress', createdAt: new Date('2023-01-02') },
    ];
  }

  updateStatus(id: number, event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as 'open' | 'in-progress' | 'resolved';
    const index = this.queriesReports.findIndex(item => item.id === id);
    if (index !== -1) {
      this.queriesReports[index].status = newStatus;
      // Here you would typically update the status on your backend
      console.log(`Updated status of item ${id} to ${newStatus}`);
    }
  }

}
