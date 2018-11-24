import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  // This returns Observable<HttpResponse<string>>. HttpResponse<string> is essentially a JSON stringified response body
  registerUser(user) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post(environment.production ? "users/register" : "http://localhost:3000/users/register", user, {headers});
  }

  authenticateUser(user: { username: String; password: String }) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post(environment.production ? "users/authenticate" : "http://localhost:3000/users/authenticate", user, {headers});
  }

  getProfile() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.loadTokenAndGet()
    });
    if (!this.authToken) return "Unauthorized";
    return this.http.get(environment.production ? "users/profile" : "http://localhost:3000/users/profile", {headers});
  }

  storeUserData(token: any, user: any) {
    // JWT's default behavior is to look for this 'id_token' key in local storage
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadTokenAndGet() {
    return this.authToken = localStorage.getItem("id_token")
  }

  // Return true if logged in; False otherwise
  // noinspection JSMethodCanBeStatic
  loggedIn() {
    if (localStorage.id_token === undefined ){
      return false
    } else {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(localStorage.id_token); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
