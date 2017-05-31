import { Injectable } from '@angular/core';
import { INotification } from '../models';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  private notificationSource = new Subject<INotification>();
  public notification$ = this.notificationSource.asObservable();

  private clearSource = new Subject<boolean>();
  public clear$ = this.clearSource.asObservable();

  constructor() { }

  notif(notification: INotification) {
    this.notificationSource.next(notification);
  }

  clear() {
    this.clearSource.next(false);
  }


}
