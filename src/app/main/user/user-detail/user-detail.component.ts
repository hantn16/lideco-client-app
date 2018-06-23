import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/domain/user.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() user: User;
  userForm: FormGroup;
  avatarPreview: String;

  isLoading = false;
  private createMode = true;
  private userId: string;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private _notificationService: NotificationService) {
    this.createForm();
  }
  createForm(): any {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.avatarPreview = this.user.imgLink;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.user);
    $('#filePicker').value = '';
    this.userForm.reset();
    this.rebuildForm();
  }
  rebuildForm() {
    this.userForm.reset({
      name: this.user.name,
      fullName: this.user.fullName,
      email: this.user.email,
      avatar: this.user.imgLink
    });
    this.avatarPreview = this.user.imgLink;
  }
  onSaveUser() {
    this.user = this.prepareSaveUser();
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.createMode) {
      this.userService.addUser(
        this.userForm.value.email,
        this.userForm.value.name,
        this.userForm.value.fullName,
        this.userForm.value.avatar
      );
    } else {
      this.userService.updateUser(
        this.userId,
        this.userForm.value.email,
        this.userForm.value.name,
        this.userForm.value.fullName,
        this.userForm.value.avatar
      );
    }
    this.userForm.reset();
  }
  // updateSeller() {
  //   const updatedSeller = this.userService.patch(`users/${this.user.id}`, this.user)
  //     .subscribe((res) => {
  //       this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
  //       // this.updateList.emit();
  //       return res.seller;
  //     }, (err) => this.userService.handleError(err));
  //   this.rebuildForm();
  // }
  // addSeller() {
  //   const newSeller = this.userService.post('users', this.user)
  //     .subscribe((res) => {
  //       this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
  //       // this.updateList.emit();
  //       return res.seller;
  //     }, err => this.userService.handleError(err));
  //   this.rebuildForm();
  // }
  // onDeleteUser() {

  // }
  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({ avatar: file });
    this.userForm.get('avatar').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  resetFileInput(event) {
    const el = event.target as HTMLInputElement;
    console.log(el.value);
    el.value = '';
  }
  prepareSaveUser() {
    const userFormModel = this.userForm.value;
    const saveUser = {
      id: userFormModel.id as string,
      name: userFormModel.name as string,
      fullName: userFormModel.fullName as string,
      email: userFormModel.email as string,
      imgLink: userFormModel.imgLink as string
    };
    return saveUser;
  }
}
