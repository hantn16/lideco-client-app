import { Component, OnInit, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../user.service';
import { User } from '../../../core/domain/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayDialog: boolean;
  cols: any[];
  users: User[];
  user: User;
  selectedUser: User;
  newUser: Boolean;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getListUsers().subscribe(res => this.users = res.users);

    this.cols = [
      { field: 'imgLink', header: 'Ảnh đại diện' },
      { field: 'email', header: 'Email' },
      { field: 'name', header: 'Tên' },
      { field: 'fullName', header: 'Tên đầy đủ' }
    ];
  }
  showDialogToAdd() {
    this.newUser = true;
    this.user = <User>{};
    this.selectedUser = this.user;
    this.displayDialog = true;
  }



  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.selectedUser = this.user;
    this.displayDialog = true;
  }

  cloneUser(us: User): User {
    const user = {};
    user['email'] = us.email;
    user['name'] = us.name;
    user['fullName'] = us.fullName;
    user['imgLink'] = us.imgLink;
    return <User>user;
  }

}
