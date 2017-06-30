import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelper();
  private cachedToken: string;

  constructor(private http: Http) { }

  signin(user: User) {
    let bodyString = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/authenticate', bodyString, options).map((res: Response) => {
      console.log(res.json());
      if (res.json().success === true) {
        let token = res.json().token;
        this.setToken(token);
      }
      return res.json();
    });
  }

  signout() {
    this.unsetToken();
  }

  register(user: User) {
    let bodyString = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/register', bodyString, options).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

  isLoggedIn() {
    if (!this.getToken()) {
      return false;
    }
    return tokenNotExpired('token');
  }

  extractUserFromToken() {
    let token = this.getToken();
    let user = this.jwtHelper.decodeToken(token).user;
    return user;
  }

  setToken(token) {
    this.cachedToken = token;
    localStorage.setItem('token', token);
  }

  unsetToken() {
    this.cachedToken = null;
    localStorage.removeItem('token');
  }

  getToken() {
    return this.cachedToken || localStorage.getItem('token');
  }

}
