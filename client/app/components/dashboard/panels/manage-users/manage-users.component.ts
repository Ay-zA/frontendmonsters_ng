import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Roles, NotificationType, INotification } from '../../../../models';
import { AdminService, NotificationService } from '../../../../services';

@Component({
  selector: 'hg-panel-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class PanelManageUsersComponent implements OnInit {

  users: User[] = [];
  students: User[] = [];
  admins: User[] = [];
  masters: User[] = [];
  newUsers: User[] = [];
  topUsers: User[] = [];
  email: string;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService) { }

  ngOnInit() {
    this.users = this.route.snapshot.data['allUsers'];
    this.initUsers();
  }

  initUsers() {
    for (let user of this.users) {
      switch (user.role) {
        case Roles.Student:
          this.students.push(user);
          break;
        case Roles.Master:
          this.masters.push(user);
          break;
        case Roles.Admin:
          this.admins.push(user);
          break;
      }
    }
  }

  onCreateMaster() {
    let newMaster = new User({ email: this.email, $editMode: true, role: Roles.Master, status: -1 });
    this.users.push(newMaster);
    this.masters.push(newMaster);
    console.log(this.users.filter((user: User) => { return user.role === Roles.Master; }));
  }

  onDeleteUser(user) {
    console.log(user);
    let userIndex = this.users.indexOf(user);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
    let masterIndex = this.masters.indexOf(user);
    if (masterIndex !== -1) {
      this.masters.splice(masterIndex, 1);
    }

    // console.log(user.status);
    if (user.status === 0) {
      this.adminService.deleteUser(user).subscribe(res => {
        let notification = {
          title: 'Deleted',
          message: `The ${user.email} user has successfully deleted.`,
          type: NotificationType.Warning
        };
        this.notificationService.notif(notification);

      });
    }
  }

  onSaveUser(user) {
    console.log(user);
    this.adminService.createMaster(user).subscribe(res => {
      let notification;
      if (res.success) {
        user.status = 0;
        notification = {
          title: 'Saved',
          message: `The ${user.email} user has successfully created.`,
          type: NotificationType.Success
        };
        this.notificationService.notif(notification);
      } else {
        notification = {
          title: 'Saved',
          message: res.message,
          type: NotificationType.Error
        };
        this.notificationService.notif(notification);
      }
    });
  }
}
