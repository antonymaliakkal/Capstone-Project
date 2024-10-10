import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WokerpageComponent } from './wokerpage.component';

describe('WokerpageComponent', () => {
  let component: WokerpageComponent;
  let fixture: ComponentFixture<WokerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WokerpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WokerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
