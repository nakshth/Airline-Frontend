import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';
import { SeatingAlgorithm } from 'src/app/services/seating-algorithm';

@Component({
  selector: 'app-seating-plan',
  templateUrl: './seating-plan.component.html',
  styleUrls: ['./seating-plan.component.scss']
})
export class SeatingPlanComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  constructor(public seatingPlanService: SeatingPlanService) { }

  ngOnInit(): void {
    this.seatingPlan = this.seatingPlanService.getSeatingPlan();
    
    // Create an instance of the SeatingAlgorithm class
    // const seatingAlgorithm = new SeatingAlgorithm(this.seatingPlan);

    // // Call the assignSeats() method of the algorithm instance
    // seatingAlgorithm.assignSeats();

    // At this point, the seating plan data has been updated with assigned seats
    console.log(this.seatingPlan);

    this.seatingPlanService.prioritizeGroupBookingSeats();
    this.seatingPlanService.allocateSeats();
    // Example: Lock seat at row 0, seat 0
    this.seatingPlanService.lockSeat(0, 0);
    
    // Example: Cancel booking for seat at row 0, seat 0 after a timeout
    setTimeout(() => {
      this.seatingPlanService.cancelBooking(0, 0);
    }, 43200000); // Timeout: 12 hours (43200000 milliseconds)

    // Example: Book seat at row 0, seat 0 for a child
    // this.seatingPlanService.bookSeat(0, 0);
    // Example: Calculate price for a child
    const childPrice = this.seatingPlanService.calculatePrice(true);
    console.log('Child Price:', childPrice);
  }

  seatSelected(seat, row, rowIndex, seatIndex, event) {
    debugger
    // seat.isBooked = event.target.checked;
    this.bookSelectedSeats(rowIndex, seatIndex, event);
  }

  bookSelectedSeats(row: number, seat: number, event: any): void {
    
    this.success = this.seatingPlanService.bookSeat(row, seat, event.target.checked);
    if (!this.success) {
      console.log('Maximum booking limit reached.');
      // Display an error message to the user
    }
  }

  isSeatAvailable(row: number, seat: number): boolean {
    return this.seatingPlanService.isSeatAvailable(row, seat);
  }

  checkSeatingRow(index: number) {
    return String.fromCharCode(65 + index)
  }
}
