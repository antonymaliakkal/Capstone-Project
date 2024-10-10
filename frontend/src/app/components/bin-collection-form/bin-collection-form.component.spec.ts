import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinCollectionFormComponent } from './bin-collection-form.component';

describe('BinCollectionFormComponent', () => {
  let component: BinCollectionFormComponent;
  let fixture: ComponentFixture<BinCollectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinCollectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
