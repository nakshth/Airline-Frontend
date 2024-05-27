import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { SeatingPlanService } from 'src/app/services/seating-plan.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger("animateMenu",[
      transition(":enter",[
        query("*", [
          style({opacity: 0, transform: "translateY(-50%)"}),
          stagger(50,[
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
          ])
        ])
      ])
    ])
  ]
})



export class HeaderComponent implements OnInit {

  responsiveMenuVisible: Boolean = false;
  pageYPosition: number;
  cvName: string = "";
  loggedInUser: any;
  bookings:boolean = false;
  constructor(
    public userservice: UserService,
    private router: Router,
    public seatingPlanService: SeatingPlanService
  ) { }

  ngOnInit(): void {debugger
    this.loggedIn();
    this.userservice.currentUser.subscribe(val=>{
      this.loggedIn();
    });
    let seatingPlan = sessionStorage['seatingPlan'] || '[]';
    let loggedInUserId = sessionStorage['loggedInUser'] || '';
    let seatingPlans = JSON.parse(seatingPlan);debugger
    let seating = seatingPlans || this.seatingPlanService.getSeatingPlan();
    this.bookings = seating.some(row => row.some(seat => (seat.isSelected || (seat.isBooked && seat.user.id == loggedInUserId))));
    this.userservice.clearBooking.subscribe(val=>{
      this.bookings = false;
      this.bookings = seating.some(row => row.some(seat => (seat.isSelected || (seat.isBooked && seat.user.id == loggedInUserId))));
    });
  }

  loggedIn() {
    let sessionData = sessionStorage['user'] || '[]';
    let loggedIn = sessionStorage['loggedInUser'] || '';
    let parseData = JSON.parse(sessionData);
    debugger
    this.loggedInUser =  parseData.find(el=> el.id == loggedIn);
    // this.loggedInUser = loggedInUser?.name || '';
  }

  logout() {
    delete sessionStorage['loggedInUser'];
    delete sessionStorage['Authenticated'];
    this.loggedInUser = '';
     this.router.navigate(['/']);
  }

  scroll(el) {
    if(document.getElementById(el)) {
      document.getElementById(el).scrollIntoView({behavior: 'smooth'});
    } else{
      this.router.navigate(['/home']).then(()=> document.getElementById(el).scrollIntoView({behavior: 'smooth'}) );
    }
    this.responsiveMenuVisible=false;
  }

  @HostListener('window:scroll', ['getScrollPosition($event)'])
    getScrollPosition(event) {
        this.pageYPosition=window.pageYOffset
    }

}
