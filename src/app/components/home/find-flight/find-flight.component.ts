import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-flight',
  templateUrl: './find-flight.component.html',
  styleUrls: ['./find-flight.component.scss'],
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
export class FindFlightComponent implements OnInit {

  FlightData;
  flightList: any = [];
  loading =  false;
  constructor(private user: UserService, public router: Router) {}

  ngOnInit() {
    this.FlightData = { from: '', destination: '', date: '' }
  }

  changeData(event) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  chooseFlight() {
    // routerLink="/seating-plan"
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/seating-plan']);
      this.loading = false;
    }, 2500);
  }
  findFlight(data) {
    if (!data.from || !data.destination || !data.date) {
      alert('please fill required fields');
      return;
    }
    this.loading = true;
    setTimeout(() => {
      var today = new Date();
      this.flightList = [{
        id:'STR001',
        from: data.from,
        destination: data.destination,
        depart: Date.now(),
        arrival: today.setHours(today.getHours() + 4),
        amount: 400
      },
      {
        id:'STR002',
        from: data.from,
        destination: data.destination,
        depart: Date.now(),
        arrival: today.setHours(today.getHours() + 4.5),
        amount: 375
      },
      {
        id:'STR003',
        from: data.from,
        destination: data.destination,
        depart: Date.now(),
        arrival: today.setHours(today.getHours() + 3.5),
        amount: 410
      }];
      this.loading = false;
    }, 2500);
  }


}
