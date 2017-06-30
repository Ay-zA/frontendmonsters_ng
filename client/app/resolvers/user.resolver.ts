import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services';
import { User } from '../models';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.currentUser;
  }
}

@Injectable()
export class AllUsersResolver implements Resolve<User> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getAllUsers();
  }
}
