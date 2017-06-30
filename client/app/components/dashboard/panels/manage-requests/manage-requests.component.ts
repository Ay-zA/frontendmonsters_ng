import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request, NotificationType, INotification } from '../../../../models';
import { RequestService, NotificationService } from '../../../../services';

@Component({
  selector: 'hg-panel-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.scss']
})
export class PanelManageRequestsComponent implements OnInit, AfterViewInit {

  requests: Request[];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.requests = this.route.snapshot.data['requests'];
  }

  ngAfterViewInit() {
    console.log('Inited');
    this.requestService.seeAll().subscribe(res => {
      console.warn(res);
    });
  }

  deleteRequest(request) {
    this.requestService.delete(request).subscribe(res => {
      let index = this.requests.indexOf(request);
      if (index !== -1) {
        this.requests.splice(index, 1);
      }
      let notification = {
        title: 'Deleted',
        message: `The request has successfully deleted.`,
        type: NotificationType.Warning
      };
      this.notificationService.notif(notification);

    });
  }

  seen(request) {
    request.status = 1;
  }

}
