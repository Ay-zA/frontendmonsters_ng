import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'hg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user: User;
  isHover: boolean;
  isOpen: boolean;
  showDetail: boolean;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    if (!this.user) {
      console.warn('Can\'t get user');
      this.user = new User({ email: 'offline@ng.com', name: 'Offline', courseTitles: ['STATIC'], role: 'student' });
    }
  }
  onMouseEnter() {
    this.isHover = true;
    setTimeout(() => {
      if (this.isHover || this.isOpen) {
        this.showDetail = true;
      }
    }, 300);
  }

  onMouseLeave() {
    if (!this.isOpen) {
      this.isHover = false;
      this.showDetail = false;
    }
  }

  onClick() {
    this.isOpen = !this.isOpen;
  }

  onMaskClick() {
    this.isOpen = false;
    this.isHover = false;
    this.showDetail = false;
  }

  signout() {
    this.authService.signout();
  }
}
