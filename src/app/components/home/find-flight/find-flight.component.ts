import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"

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

  userData;
  constructor(private user: UserService) {}

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  findFlight(data) {
    this.user.changeData(data);
  }


}
