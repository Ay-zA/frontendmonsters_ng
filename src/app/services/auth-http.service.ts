import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpService {

  constructor(private http: Http, private authService: AuthService) {
  }

  createRequestOptions(): RequestOptions {
    let headers = new Headers();
    headers.append('Authorization', this.authService.getToken());
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  get(url) {
    let options = this.createRequestOptions();
    return this.http.get(url, options);
  }

  post(url, data) {
    let options = this.createRequestOptions();
    return this.http.post(url, data, options);
  }

  delete(url) {
    let options = this.createRequestOptions();
    return this.http.delete(url, options);
  }
}
