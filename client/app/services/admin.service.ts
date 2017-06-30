import { Injectable } from '@angular/core';
import { AuthHttpService } from './auth-http.service';
import { AuthService } from './auth.service';
import { User } from '../models';

@Injectable()
export class AdminService {

  constructor(private authHttp: AuthHttpService, private authService: AuthService) { }

  createMaster(master: User) {
    return this.authService.register(master);
  }

  deleteUser(user: User) {
    return this.authHttp.delete(`/api/auth/${user._id}`).map(res => res.json());
  }

}
