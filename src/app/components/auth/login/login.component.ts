import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'hg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User();
  error: string;
  @Input() isOpen: boolean;
  forgotPassword: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.authService.signin(this.user).subscribe(loginFeedback => {
      if (loginFeedback.success === true) {
        this.router.navigate(['dashboard']);
      } else {
        this.error = loginFeedback.message;
      }
    });
  }

  onHelpClick() {
    this.forgotPassword = !this.forgotPassword;
  }

  onForgotpasswordClick() {

  }
}
