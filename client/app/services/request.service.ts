import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { Request } from '../models';

@Injectable()
export class RequestService {
  constructor(private authHttp: AuthHttpService) { }

  getAll() {
    return this.authHttp.get('api/requests/').map(this.handleResponse);
  }

  makeRequest(user, request) {
    let data = { email: user.email, technology: request.technology, description: request.description };
    return this.authHttp.post('api/requests/', data).map(this.handleResponse);
  }

  seeAll() {
    return this.authHttp.get('api/requests/seeall').map(this.handleResponse);
  }

  delete(request: Request) {
    let url = `api/requests/${request._id}`;
    return this.authHttp.delete(url).map(this.handleResponse);
  }

  handleResponse(response) {
    console.log('[RequestService]');
    if (response.json().success === false) {
      throw new Error('Request Service Error');
    }

    let data = response.json().data;
    if (data.hasOwnProperty('length')) {
      data = data.map((req) => new Request(req));
      console.log(data);
      return data;
    }

    return data;
  }
}
