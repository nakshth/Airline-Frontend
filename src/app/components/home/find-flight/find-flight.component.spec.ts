import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FindFlightComponent } from './find-flight.component';

describe('FindFlightComponent', () => {
  let component: FindFlightComponent;
  let fixture: ComponentFixture<FindFlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
