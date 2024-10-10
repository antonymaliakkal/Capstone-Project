import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRouteViewerComponent } from './collection-route-viewer.component';

describe('CollectionRouteViewerComponent', () => {
  let component: CollectionRouteViewerComponent;
  let fixture: ComponentFixture<CollectionRouteViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRouteViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRouteViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
