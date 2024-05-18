import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';
import { SeatingAlgorithm } from 'src/app/services/seating-algorithm';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss']
})
export class CancellationComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  constructor(public seatingPlanService: SeatingPlanService) { }

  ngOnInit(): void {
  }

}
