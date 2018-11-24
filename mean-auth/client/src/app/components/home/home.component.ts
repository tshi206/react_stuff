import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: String;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    //localStorage only holds string so need to parse the JSON string back to a user object before using it
    this.name = JSON.parse(localStorage.user || "{}").name || "Anonymous visitor"
  }

}
