import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FindFlightComponent } from './find-flight.component';
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FindFlightComponent', () => {
  let component: FindFlightComponent;
  let fixture: ComponentFixture<FindFlightComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FindFlightComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should find flights successfully', fakeAsync(() => {
    const data = { from: 'CityA', destination: 'CityB', date: '2024-05-28' };
    component.findFlight(data);
    expect(component.loading).toBe(true);
    tick(); // Simulate the asynchronous data retrieval
    expect(component.flightList.length).toBeGreaterThan(0);
    expect(component.loading).toBe(false);
  }));

  it('should navigate to seating plan', () => {
    component.chooseFlight();
    expect(component.loading).toBe(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/seating-plan']);
    expect(component.loading).toBe(false);
  });
});
