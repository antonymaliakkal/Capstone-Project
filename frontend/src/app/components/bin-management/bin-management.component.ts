// bin-management.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Bin } from '../../models/bin.model';
import { BinService } from '../../services/bin.service';

@Component({
  selector: 'app-bin-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bin-management.component.html',
  styleUrls: ['./bin-management.component.css']
})
export class BinManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private binService = inject(BinService);

  binForm: FormGroup = new FormGroup({});
  bins: Bin[] = [];
  editingBinId: number | null = null;

  ngOnInit() {
    this.initForm();
    this.loadBins();
  }

  initForm() {
    this.binForm = this.fb.group({
      location: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      wasteAmount: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      fillLevel: ['', Validators.required]
    });
  }

  loadBins() {
    this.binService.getBins().subscribe(
      bins => this.bins = bins,
      error => console.error('Error loading bins:', error)
    );
  }

  onSubmit() {
    if (this.binForm.valid) {
      const binData = this.binForm.value;
      if (this.editingBinId) {
        this.updateBin(binData);
      } else {
        this.createBin(binData);
      }
    }
  }

  createBin(binData: Omit<Bin, 'id' | 'createdAt' | 'lastCollectionDate' | 'nextCollectionDate'>) {
    this.binService.addBin(binData).subscribe(
      newBin => {
        this.bins.push(newBin);
        this.binForm.reset();
      },
      error => console.error('Error creating bin:', error)
    );
  }

  updateBin(binData: Partial<Bin>) {
    if (this.editingBinId) {
      const updatedBin: Bin = { ...binData, id: this.editingBinId } as Bin;
      console.log(updatedBin)
      this.binService.updateBin(updatedBin).subscribe(
        () => {
          const index = this.bins.findIndex(b => b.id === this.editingBinId);
          if (index !== -1) {
            this.bins[index] = { ...this.bins[index], ...updatedBin };
          }
          this.cancelEdit();
        },
        error => console.error('Error updating bin:', error)
      );
    }
  }

  editBin(bin: Bin) {
    this.editingBinId = bin.id;
    this.binForm.patchValue({
      location: bin.location,
      latitude: bin.latitude,
      longitude: bin.longitude,
      wasteAmount: bin.wasteAmount,
      status: bin.status,
      fillLevel: bin.fillLevel
    });
  }

  cancelEdit() {
    this.editingBinId = null;
    this.binForm.reset();
  }

  deleteBin(id: number) {
    this.binService.deleteBin(id).subscribe(
      () => {
        this.bins = this.bins.filter(b => b.id !== id);
      },
      error => console.error('Error deleting bin:', error)
    );
  }
}