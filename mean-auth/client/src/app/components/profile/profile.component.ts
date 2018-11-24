import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  async ngOnInit() {
    const result = this.authService.getProfile();
    if (typeof (result) === "string") {
      this.flashMessages.show(`Error: ${result}`, { cssClass: "alert-danger", timeout: 5000 });
      await this.router.navigate(["/login"])
    } else {
      result.subscribe(
        data => {
          console.log(data);
          this.user = data["user"];
        },
        async error => {
          console.log(error);
          this.flashMessages.show(`Error: ${error}`, { cssClass: "alert-danger", timeout: 5000 });
          await this.router.navigate(["/login"])
        }
      )
    }
  }

}
