import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';
import { SeatingAlgorithm } from 'src/app/services/seating-algorithm';
import { ArraySortPipe } from 'src/app/pipe/sort';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-seating-plan',
  templateUrl: './seating-plan.component.html',
  styleUrls: ['./seating-plan.component.scss'],
  // pipes: [ ArraySortPipe ]
})
export class SeatingPlanComponent implements OnInit {
  seatingPlan: any[][];
  MAX_BOOKING_LIMIT_REACHED: boolean = false;
  selectedSeats = []
  total: number = 0;
  price: number = 0;
  loggedInUser: any;
  selectedUser = '';
  UsersList: any = [];
  constructor(public seatingPlanService: SeatingPlanService, 
    private router: Router, private discountSErvice: DiscountService,) { }

  ngOnInit(): void {
    debugger
    // this.seatingPlanService.bookedSeats.clear();
    let sessionseatingPlan = sessionStorage['seatingPlan']
    if (sessionseatingPlan) {
      this.seatingPlanService.seatingPlan = JSON.parse(sessionseatingPlan);
    } else {
      this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
        row.forEach((seat, seatIndex) => {
          this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['seatID'] = `${rowIndex + 1} ${this.checkSeatingRow(seatIndex)}`
        });
      });
      // this.seatingPlanService.seatingPlan = this.seatingPlanService.getSeatingPlan();
    }
    this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
      row.forEach((seat, seatIndex) => {
        if (this.seatingPlanService.isNearFireExit(rowIndex, seatIndex)) {
          this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['nearFireExit'] = true;
        }
      });
    });
    let usersList = JSON.parse(sessionStorage['user'] || '[]'); debugger
    this.UsersList = usersList.filter(el => el.role == 'user');
    // const seatingPlan = this.seatingPlanService.getSeatingPlan(); debugger
    // this.seatingPlan = seatingPlan.sort((a: any, b: any) => a[0]['sort'] - b[0]['sort']);

    // Create an instance of the SeatingAlgorithm class
    // const seatingAlgorithm = new SeatingAlgorithm(this.seatingPlan);

    // // Call the assignSeats() method of the algorithm instance
    // seatingAlgorithm.assignSeats();

    // At this point, the seating plan data has been updated with assigned seats
    console.log(this.seatingPlanService.seatingPlan);

    // this.seatingPlanService.prioritizeGroupBookingSeats();
    // this.seatingPlanService.allocateSeats();
    // Example: Lock seat at row 0, seat 0
    // this.seatingPlanService.lockSeat(0, 0);

    // Example: Cancel booking for seat at row 0, seat 0 after a timeout
    setTimeout(() => {
      this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
        row.forEach((seat, seatIdx) => {
          if (seat.isBooked) {
            this.seatingPlanService.cancelBooking(rowIndex, seatIdx);
          }
        });
      });
    }, 43200000); // Timeout: 12 hours (43200000 milliseconds)

    // Example: Book seat at row 0, seat 0 for a child
    // this.seatingPlanService.bookSeat(0, 0);
    // Example: Calculate price for a child
    // const childPrice = this.seatingPlanService.calculatePrice(true);
    // console.log('Child Price:', childPrice);
    let sessionData = sessionStorage['user'] || '[]';
    let loggedIn = sessionStorage['loggedInUser'] || '';
    let parseData = JSON.parse(sessionData);
    debugger
    this.loggedInUser = parseData.find(el => el.id == loggedIn);
    this.selectedSeats = this.seatingPlanService.seatingPlan.map(el => el.filter(el1 => el1.isSelected || (el1.isBooked && el1.user.id == loggedIn))).flat(1);
  }

  selectedUserChanged() {
    sessionStorage['selectedUser'] = this.selectedUser;
  }

  seatSelected(seat, row, rowIndex, seatIndex, event) {
debugger
    // if (event.target.checked && this.seatingPlanService.areAdjacentSeatsAvailable(rowIndex, seatIndex)) {
    //   event.preventDefault();
    //   event.stopPropagation();

    //   return;
    // }
    this.bookSelectedSeats(seat, row, rowIndex, seatIndex, event);
    this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['isSelected'] = event.target.checked;
    this.seatingPlanService.seatingPlan[rowIndex][seatIndex]['seatNumber'] = `${rowIndex + 1} ${this.checkSeatingRow(seatIndex)}`;
    let loggedInUser = sessionStorage['loggedInUser']; debugger
    this.selectedSeats = this.seatingPlanService.seatingPlan.map(el => el.filter(el1 => (el1.isSelected && !el1.isBooked) || (el1.isBooked && el1.user.id == loggedInUser))).flat(1);
  }

  bookSelectedSeats(row: any, seat: any, rowIndex, seatIndex, event: any): void {
    debugger
    this.seatingPlanService.bookSeat(row, seat, rowIndex, seatIndex, event.target.checked);
    if (this.seatingPlanService.bookedSeats.size >= this.seatingPlanService.MAX_BOOKING_LIMIT) {
      console.log('Maximum booking limit reached.');
      this.MAX_BOOKING_LIMIT_REACHED = true;
      // Display an error message to the user
    } else {
      this.MAX_BOOKING_LIMIT_REACHED = false;
    }
  }

  isSeatAvailable(row: number, seat: number): boolean {
    return this.seatingPlanService.isSeatAvailable(row, seat);
  }
  //Seat {{ rowIndex + 1 }} {{ checkSeatingRow(seatIndex) }}
  checkSeatingRow(index: number) {
    return String.fromCharCode(65 + index)
  }

  calcMembs() {
    // if (this.total > 6) alert('max seats are 6')
    this.total = this.seatingPlanService.adults + this.seatingPlanService.childs;
    let adultprice = this.discountSErvice.applyDiscount(this.seatingPlanService.adults, 20, 100);
    let childprice = this.discountSErvice.applyDiscount(this.seatingPlanService.childs, 15, 100);
    this.price = adultprice + childprice;
  }
  confirmBooking() {
    // this.seatingPlanService.seatingPlan.forEach((row, rowIndex)=>{
    //         row.forEach((seat, seatIdx)=> {
    //           if(seat.isSelected) {
    //             seat
    //           }
    //           this.bookSelectedSeats(seat, row, rowIndex, seatIdx, seat.isSelected);
    //         })
    //       });
    if (this.seatingPlanService.bookedSeats.size == 0) {
      alert('Select Seat to proceed')
    } else {
      sessionStorage['seatingPlan'] = JSON.stringify(this.seatingPlanService.seatingPlan);
      setTimeout(() => {
        this.router.navigate(['/booking']);
      }, 500);

    }
  }
  lockSeats() {
    this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
      row.forEach((seat, seatIdx) => {
        if (seat.isSelected && !seat.isBooked) {
          this.seatingPlanService.lockSeat(rowIndex, seatIdx);
        }
      });
    });
  }

  unlockSeat() {
    this.seatingPlanService.seatingPlan.forEach((row, rowIndex) => {
      row.forEach((seat, seatIdx) => {
        if (seat.isSelected && !seat.isBooked) {
          this.seatingPlanService.unlockSeat(rowIndex, seatIdx);
        }
      });
    });
  }

  isSeatLocked(row: number, seat: number): boolean {
    return this.seatingPlanService.isSeatLocked(row, seat);
  }
  
}
