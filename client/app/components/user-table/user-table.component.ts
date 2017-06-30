import { EventEmitter, Output, Component, OnInit, Input } from '@angular/core';
import { User, Panel, Roles } from '../../models';
import { AdminService } from '../../services';

@Component({
  selector: 'hg-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() add: string;
  @Output() createUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @Output() saveUser = new EventEmitter();
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  onCreateUser() {
    this.createUser.emit(null);
  }

  onDeleteUser(user) {
    this.deleteUser.emit(user);
  }

  onSaveUser(user) {
    user.password = 'hg';
    user.role = Roles.Master;
    console.log(user);

    this.saveUser.emit(user);
    // this.adminService.createMaster(user).subscribe(res => {
    //   user.status = 0;
    // });
  }

  isEditable(user: User) {
    return user.status < 1 && !!this.add;
  }

  onEmailSubmit(e, user: User) {
    user.email = e;
  }
}
