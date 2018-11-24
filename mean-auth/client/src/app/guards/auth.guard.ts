import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Promise<boolean> {
    if (this.authService.loggedIn()) {
      return true
    } else {
      this.flashMessages.show("You need to login first to access this page", { cssClass: "alert-danger", timeout: 5000 });
      await this.router.navigate(['/login']);
      return false
    }
  }
}

