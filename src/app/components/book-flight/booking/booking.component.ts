import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { DiscountService } from 'src/app/services/discount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'], animations: [
    trigger('findFlightTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class BookingComponent implements OnInit {
  bookingList: any[];
  total = 0;
  price = 0;
  success: boolean = false;
  type = '';
  loading = false;
  booking:boolean = false;
  newbooking:boolean = false;
  constructor(public discountSErvice: DiscountService, public seatingPlanService: SeatingPlanService, private router: Router,) { }

  ngOnInit(): void {
    // this.bookingList = []
    // this.seatingPlanService.seatingPlan
    debugger
    let loggedInUserId = sessionStorage['loggedInUser'] || '';
    this.bookingList = this.seatingPlanService.seatingPlan.map(el => el.filter(el1 => el1.isSelected || (el1.isBooked && el1.user.id == loggedInUserId))).flat(1);
    this.bookingList.forEach(val => val.child = 'false');
    this.seatingPlanService.adults = this.bookingList.length;
    this.seatingPlanService.childs = 0;
    this.calcMembs();

    let seatingPlan = sessionStorage['seatingPlan'] || '[]';
    let seatingPlans = JSON.parse(seatingPlan);
    let seating = seatingPlans || this.seatingPlanService.seatingPlan;debugger
    this.booking = seating.some(row => row.some(seat => (seat.isBooked && seat.user.id == loggedInUserId)));
    this.newbooking = seating.some(row => row.some(seat => (seat.isSelected && !seat.isBooked)));
  }

  calcMembs() {
    // if (this.total > 6) alert('max seats are 6')
    this.total = this.seatingPlanService.adults + this.seatingPlanService.childs;
    let adultprice = this.discountSErvice.applyDiscount(this.seatingPlanService.adults, 20, 100);
    let childprice = this.discountSErvice.applyDiscount(this.seatingPlanService.childs, 15, 100);
    this.price = adultprice + childprice;
  }
  changeValues(seat) {debugger
    if (seat.child == "true") {
      this.seatingPlanService.childs = this.seatingPlanService.childs + 1;
      this.seatingPlanService.adults = this.seatingPlanService.adults - 1;
    } else {
      this.seatingPlanService.adults + this.seatingPlanService.adults + 1;
      this.seatingPlanService.childs = this.seatingPlanService.childs - 1;
    }
    this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
      row.forEach((seat1, seatIndex) => {
        if(seat.seatID == this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['seatID']) {
          this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['seatID'] = `${rowIndex + 1} ${this.checkSeatingRow(seatIndex)}`
        }
      });
    });
    this.calcMembs();
  }
  checkSeatingRow(index: number) {
    return String.fromCharCode(65 + index)
  }
  confirmBooking() {
    this.loading = true;
    // let user = sessionStorage['user'];
    if (!sessionStorage['Authenticated']) {
      alert('Please Login/ Register')
    }
    let sessionData = sessionStorage['user'] || '[]';
    let loggedInUserId = sessionStorage['loggedInUser'] || '';
    let users = JSON.parse(sessionData);
    debugger
    let user = users.find(el => el.id == loggedInUserId);
    if (user.role == 'staff') {
      let selectedUser = sessionStorage['selectedUser'] || '';
      user = users.find(el => el.id == selectedUser);
      user['bookedBy'] = loggedInUserId;
    }
    // let seatingPlan = this.seatingPlanService.seatingPlan;
    this.seatingPlanService.seatingPlan.forEach(row => {
      row.forEach(seat => {
        if (seat.isSelected) {
          seat = Object.assign(
            seat, {
            amount: seat.child == "true" ? 75 : 100,
            isBooked: true,
            isSelected: false,
            user: user
          })
        }
      })
    });
    sessionStorage['seatingPlan'] = JSON.stringify(this.seatingPlanService.seatingPlan);
    this.success = true;
    this.type = 'book'
    setTimeout(() => {
      this.type = '';
      this.success = false;
      this.router.navigate(['/seating-plan']);
      this.seatingPlanService.bookedSeats.clear();
      this.loading = false;
    }, 2500);
  }

  gotoCancelPage() {
    this.router.navigate(['/cancel-booking']);
  }
}
