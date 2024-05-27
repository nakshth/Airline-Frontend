import { Component, OnInit } from '@angular/core';
import { SeatingPlanService } from '../../../services/seating-plan.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  constructor(public seatingPlanService: SeatingPlanService) { }

  ngOnInit(): void {
  }

}
