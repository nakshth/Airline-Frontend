import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import Keyboard from "simple-keyboard";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('signupTrigger', [
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
export class SignUpComponent implements OnInit {
  userData;
  value = "";
  loading = false;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => this.userData = userData)
  }
  signUp(data) {
    this.loading = true;
    this.user.signup(data).subscribe((resp: any) => {
      setTimeout(() => {
        if (resp?.status === 200 && data) {
          this.router.navigate(['/login']);
        } else {
          alert('User not registered. please try again.');
        }
        this.loading = false;
      }, 2500);
    })
  }

  ngAfterViewInit() {
  }

}
