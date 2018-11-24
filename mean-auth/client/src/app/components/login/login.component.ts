import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe(
      async data => {
        this.authService.storeUserData(data["payload"].token, data["payload"].user);
        this.flashMessages.show("You are now login", { cssClass: "alert-success", timeout: 5000 });
        await this.router.navigate(["/dashboard"])
      },
      async error => {
        this.flashMessages.show(error["error"].payload, { cssClass: "alert-danger", timeout: 5000 });
        await this.router.navigate(["/login"])
      }
    )
  }
}
