import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { DiscountService } from 'src/app/services/discount.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss'],
  animations: [
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
export class CancellationComponent implements OnInit {
  bookingList: any[];
  total = 0;
  price = 0;
  success: boolean = false;
  type = '';
  loading = false;
  constructor(
    public discountSErvice: DiscountService, 
    public seatingPlanService: SeatingPlanService, 
    private router: Router,
    public user: UserService
  ) { }

  ngOnInit(): void {
    // this.bookingList = []
    // this.seatingPlanService.seatingPlan
    let loggedInUser = sessionStorage['loggedInUser']
    this.bookingList = this.seatingPlanService.seatingPlan.map(el => el.filter(el1 => el1.isSelected || (el1.isBooked && el1.user.id == loggedInUser))).flat(1);
    this.bookingList.forEach(val => val.child = 'false');
    this.seatingPlanService.adults = this.bookingList.length;
    this.seatingPlanService.childs = 0;
    this.calcMembs();

  }
  calcMembs() {
    // if (this.total > 6) alert('max seats are 6')
    this.total = this.seatingPlanService.adults + this.seatingPlanService.childs;
    let adultprice = this.discountSErvice.applyDiscount(this.seatingPlanService.adults, 20, 100);
    let childprice = this.discountSErvice.applyDiscount(this.seatingPlanService.childs, 15, 100);
    this.price = adultprice + childprice;
  }

  checkSeatingRow(index: number) {
    return String.fromCharCode(65 + index)
  }


  cancelBooking() {
    this.loading = true;
    let sessionData = sessionStorage['user'] || '[]';
    let loggedInUserId = sessionStorage['loggedInUser'] || '';
    // let users = JSON.parse(sessionData);
    // let seatingPlan = this.seatingPlanService.seatingPlan;
    this.seatingPlanService.seatingPlan.forEach(row => {
      row.forEach(seat => {
        if (seat.isBooked && seat.user.id == loggedInUserId) {
          seat = Object.assign(
            seat, {
              amount: 0,
              isBooked: false,
              isSelected: false,
              user: { id: '', bookedBy: '' }
            })
        }
      })
    });
    sessionStorage['seatingPlan'] = JSON.stringify(this.seatingPlanService.seatingPlan);
    this.success = true;
    this.type = 'cancel';
    setTimeout(() => {
      this.success = false; this.type = '';
      this.user.changeclearBookingSourceData(false);
      this.router.navigate(['/']);
      this.loading = false;
    }, 2500);
  }
}
