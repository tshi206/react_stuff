import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    if (!this.validateService.validateRegister(user)) {
      this.flashMessageService.show("Please fill in all fields", { cssClass: "alert-danger", timeout: 3000 });
      return
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.show("Please use a valid email", { cssClass: "alert-danger", timeout: 3000 });
      return
    }
    this.authService.registerUser(user).subscribe(async data => {
      if (data["status"] === 200) {
        console.log(JSON.stringify(data));
        this.flashMessageService.show("You are now registered and ready to login", { cssClass: "alert-success", timeout: 3000 });
        await this.router.navigate(['/login']);
      } else {
        console.log(JSON.stringify(data));
        this.flashMessageService.show("Internal Service Error. Please try again later.", { cssClass: "alert-danger", timeout: 3000 });
        await this.router.navigate(['/register']);
      }
    });
  }

}
