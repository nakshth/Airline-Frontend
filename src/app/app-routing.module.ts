import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/home/login/login.component';
import { SignUpComponent } from './components/home/signup/signup.component'
import { FindFlightComponent } from './components/home/find-flight/find-flight.component';

const routes: Routes = [

  {path: '',      component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'find-flight', component: FindFlightComponent },
  
  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  {path: '**', pathMatch: 'full', redirectTo: '/'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
