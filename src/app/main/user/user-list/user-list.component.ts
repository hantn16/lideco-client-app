import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../user.service';
import { User } from '../../../core/domain/user.model';
import * as $ from 'jquery';
import { Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayDialog: boolean;
  cols: any[];
  users: User[];
  isLoading = false;
  user: User;
  selectedUser: User;
  newUser: Boolean = true;
  private usersSub: Subscription;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    // this.users = this._userService.getListUsers();
    this.isLoading = true;
    this.cols = [
      { field: 'imgLink', header: 'Ảnh đại diện' },
      { field: 'email', header: 'Email' },
      { field: 'name', header: 'Tên' },
      { field: 'fullName', header: 'Tên đầy đủ' }
    ];
    this._userService.getListUsers();
    this.usersSub = this._userService.getUserUpdateListener()
      .subscribe((users) => {
        this.isLoading = false;
        this.users = users;
      });
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
  resetDialog(event: Event) {
  }
  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}
