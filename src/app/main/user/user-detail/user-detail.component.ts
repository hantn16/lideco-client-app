import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {


  @Input() user;
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private _notificationService: NotificationService) {
    // this.createForm();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.rebuildForm();
  }
  // createForm(): any {
  //   this.userForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     name: 'Noname',
  //     fullName: 'Noname',
  //     imgLink: 'img.jpg'
  //   });
  // }
  rebuildForm() {
    // this.userForm.reset({
    //   email: this.user.email,
    //   name: this.user.name,
    //   fullName: this.user.fullName,
    //   imgLink: this.user.imgLink
    // });
  }
  saveUser() {
  }

  deleteUser() {

  }
  onChangeAvatar(event) {

  }
}
