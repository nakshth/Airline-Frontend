import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginTrigger', [
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
export class LoginComponent implements OnInit {

  userData;
  loading: boolean = false;
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.userData = { email: '', password: '' };
    // this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login(data) {
    if (!data.email || !data.password) {
      alert('please fill required fields');
      return;
    }
    // this.user.changeData(data);
    this.loading = true;
    this.user.login(data).subscribe((data: any) => {
      if (data?.status === 200 && data?.data) {
        setTimeout(() => {
          sessionStorage['loggedInUser'] = data.data.id;
          this.router.navigate(['/find-flight']);
          this.user.changeData1(data.data);
          this.loading = false;
        }, 2500);
      } else {
        setTimeout(() => {
          this.router.navigate(['/sign-up']);
          delete sessionStorage['Authenticated'];
          alert('User not authenticated. please register. navigating to registration page...');
          this.loading = false;
        }, 1000);
      }
    })
  }


}
