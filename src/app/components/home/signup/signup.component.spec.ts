import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignUpComponent } from './signup.component';
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent; 
  let fixture: ComponentFixture<SignUpComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['currentUserData', 'signup']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should sign up successfully', () => {
    const data = { email: 'test@example.com', password: 'password' };
    const mockResponse = { status: 200 };
    userServiceMock.signup.and.returnValue(of(mockResponse));

    component.signUp(data);
    expect(component.loading).toBe(true);
    // tick(100);

    // expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.loading).toBe(false);
  });

  it('should handle sign up failure', () => {
    const data = { email: 'test@example.com', password: 'password' };
    const mockResponse = { status: 400 };
    userServiceMock.signup.and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.signUp(data);
    expect(component.loading).toBe(true);
    // tick(100);

    // expect(window.alert).toHaveBeenCalledWith('User not registered. please try again.');
    expect(component.loading).toBe(false);
  });

  it('should handle sign up error', fakeAsync(() => {
    const data = { email: 'test@example.com', password: 'password' };
    userServiceMock.signup.and.returnValue(throwError(() => new Error('Sign up error')));
    spyOn(window, 'alert');

    component.signUp(data);
    expect(component.loading).toBe(true);
    tick();

    // expect(window.alert).toHaveBeenCalledWith('User not registered. please try again.');
    expect(component.loading).toBe(false);
  }));
});
