import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { GeneralModule } from './components/general/general.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './components/home/login/login.component';
import { SignUpComponent } from './components/home/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { FindFlightComponent } from './components/home/find-flight/find-flight.component';
import { SeatingPlanComponent } from './components/book-flight/seating-plan/seating-plan.component';
import { SeatingPlanService } from './services/seating-plan.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './components/book-flight/booking/booking.component';
import { CancellationComponent } from './components/book-flight/cancellation/cancellation.component';
import { AdminDashboardComponent } from './components/home/admin-dashboard/admin-dashboard.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    SignUpComponent,
    FindFlightComponent,
    SeatingPlanComponent,
    BookingComponent,
    CancellationComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    HomeModule,
    GeneralModule,

    FormsModule,
    AnimateOnScrollModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService, UserService, SeatingPlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
