import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BinService } from '../../services/bin.service';

@Component({
  selector: 'app-bin-collection-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bin-collection-form.component.html',
  styleUrl: './bin-collection-form.component.css'
})
export class BinCollectionFormComponent {
  binForm: FormGroup;

  constructor(private fb: FormBuilder , private binService:BinService) {
    this.binForm = this.fb.group({
      binId: ['', Validators.required],
      fillLevel: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      wasteType: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    
  

    if (this.binForm.valid) {
      console.log(this.binForm.value);
      // Here you would typically send the form data to your backend
    }
  }
}