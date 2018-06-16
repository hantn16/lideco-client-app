import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DataService } from '../../../core/services/data.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { User } from '../../../core/domain/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {

  @Input() user: User;
  userForm: FormGroup;
  avatarPreview: String;
  constructor(private fb: FormBuilder,
    private _dataService: DataService,
    private _notificationService: NotificationService) {
    this.createForm();
  }
  createForm(): any {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      imgLink: '',
      fullName: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.avatarPreview = this.user.imgLink;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }
  rebuildForm() {
    this.userForm.reset({
      name: this.user.name,
      fullName: this.user.fullName,
      email: this.user.email,
      imgLink: this.user.imgLink,
      avatar: null
    });
    this.avatarPreview = this.user.imgLink;
  }
  onSaveUser() {
    this.user = this.prepareSaveUser();
    // if (this.user.id === null) {
    //   this.addSeller();
    // } else {
    //   this.updateSeller();
    // }
  }
  updateSeller() {
    const updatedSeller = this._dataService.patch(`users/${this.user.id}`, this.user)
      .subscribe((res) => {
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        // this.updateList.emit();
        return res.seller;
      }, (err) => this._dataService.handleError(err));
    this.rebuildForm();
  }
  addSeller() {
    const newSeller = this._dataService.post('users', this.user)
      .subscribe((res) => {
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        // this.updateList.emit();
        return res.seller;
      }, err => this._dataService.handleError(err));
    this.rebuildForm();
  }
  onDeleteUser() {

  }
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
  prepareSaveUser() {
    const formModel = this.userForm.value;
    const saveUser = {
      id: formModel.id as string,
      name: formModel.name as string,
      fullName: formModel.fullName as string,
      email: formModel.email as string,
      imgLink: formModel.imgLink as string
    };
    return saveUser;
  }
}
