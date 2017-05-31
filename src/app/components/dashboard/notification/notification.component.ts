import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services';
import { INotification } from '../../../models';

@Component({
  selector: 'hg-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: INotification;
  fadeIn = false;
  typeClass = ['success', 'warning', 'error'];

  constructor(private notificationService: NotificationService) {
    notificationService.notification$.subscribe(
      notification => {
        this.notification = notification;
        console.log(this.fadeIn);
        setTimeout(() => { this.fadeIn = true; }, 0);
        let time = notification.timeout || 3500;
        setTimeout(() => { this.clearNotification(); }, time);
      });

    notificationService.clear$.subscribe(
      (foo) => {
        this.notification = null;
      });
  }

  ngOnInit() {
  }

  clearNotification() {
    this.fadeIn = false;
    setTimeout(() => {
      this.notification = null;
    }, 500);
  }

}
