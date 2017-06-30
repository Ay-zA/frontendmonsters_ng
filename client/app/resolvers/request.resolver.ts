import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Request } from '../models';
import { RequestService } from '../services';

@Injectable()
export class RequestResolver implements Resolve<Request> {

  constructor(private requestService: RequestService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.requestService.getAll();
  }
}
