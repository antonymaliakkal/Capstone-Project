import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesListingComponent } from './route-listing.component';

describe('RouteListingComponent', () => {
  let component: RoutesListingComponent;
  let fixture: ComponentFixture<RoutesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
