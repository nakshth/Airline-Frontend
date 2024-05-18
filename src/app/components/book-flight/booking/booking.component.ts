import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  constructor(public seatingPlanService: SeatingPlanService) { }

  ngOnInit(): void {

  }
}
