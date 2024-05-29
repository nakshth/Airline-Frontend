import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['login', 'changeData', 'changeData1']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userData on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userData).toEqual({ email: '', password: '' });
  });

  it('should change data on changeData event', () => {
    const event = { target: { value: 'test@example.com' } };
    component.changeData(event);
    expect(userServiceMock.changeData).toHaveBeenCalledWith('test@example.com');
  });

  it('should show alert if login data is missing', () => {
    spyOn(window, 'alert');
    component.login({ email: '', password: '' });
    expect(window.alert).toHaveBeenCalledWith('please fill required fields');
  });

  it('should login successfully and navigate to /find-flight', fakeAsync(() => {
    const mockResponse = { status: 200, data: { id: '12345' } };
    userServiceMock.login.and.returnValue(of(mockResponse));

    component.login({ email: 'test@example.com', password: 'password' });
    expect(component.loading).toBe(true);
    tick(5000);

    expect(sessionStorage['loggedInUser']).toEqual('12345');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/find-flight']);
    expect(userServiceMock.changeData1).toHaveBeenCalledWith(mockResponse.data);
    expect(component.loading).toBe(false);
  }));

  it('should fail login and navigate to /sign-up', fakeAsync(() => {
    const mockResponse = { status: 401 };
    userServiceMock.login.and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.login({ email: 'test@example.com', password: 'password' });
    expect(component.loading).toBe(true);
    tick(1000);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/sign-up']);
    expect(window.alert).toHaveBeenCalledWith('User not authenticated. please register. navigating to registration page...');
    expect(component.loading).toBe(false);
  }));

  // it('should handle login error', fakeAsync(() => {
  //   userServiceMock.login.and.returnValue(throwError(() => new Error('Login error')));
  //   spyOn(window, 'alert');

  //   component.login({ email: 'test@example.com', password: 'password' });
  //   expect(component.loading).toBe(true);
  //   tick();

  //   expect(window.alert).toHaveBeenCalledWith('User not authenticated. please register. navigating to registration page...');
  //   expect(routerMock.navigate).toHaveBeenCalledWith(['/sign-up']);
  //   expect(component.loading).toBe(false);
  // }));
});