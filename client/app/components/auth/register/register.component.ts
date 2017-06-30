import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'hg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = new User();
  error: string;
  @Input() isOpen: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.user).subscribe((feedback) => {
      if (feedback.success) {
        console.log('Registered');
        this.authService.signin(this.user);
      } else {
        this.error = feedback.message;
      }
    });
  }

  onClick() {
    this.isOpen = !this.isOpen;
  }
}
