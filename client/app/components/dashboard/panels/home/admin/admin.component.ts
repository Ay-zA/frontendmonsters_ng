import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User, PanelButton } from '../../../../../models';
@Component({
  selector: 'hg-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input() user: User;

  manageCourse = new PanelButton({ icon: 'fontello icon-book-open', subtitle: 'Manage Course' });
  manageUsers = new PanelButton({ icon: 'fontello icon-group', subtitle: 'Manage Users' });
  manageRequests = new PanelButton({ icon: 'fontello icon-post', subtitle: 'Manage Requests' });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onManageCourseClick() {
    this.router.navigate(['/dashboard/manage/courses']);
  }

  onManageUserClick() {
    this.router.navigate(['/dashboard/manage/users']);
  }

  onManageRequestClick() {
    this.router.navigate(['/dashboard/manage/requests']);
  }

}
