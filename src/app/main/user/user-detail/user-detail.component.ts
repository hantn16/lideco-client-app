import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DataService } from '../../../core/services/data.service';
import { MessageContstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnChanges {



  @Input() user;
  userForm: FormGroup;
  avatarPreview: String;
  constructor(private fb: FormBuilder,
    private _dataService: DataService,
    private _notificationService: NotificationService) {
    this.createForm();
  }
  createForm(): any {
    this.userForm = this.fb.group({
      name: '',
      imgLink: '',
      fullName: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildForm();
  }
  rebuildForm() {
    this.userForm.reset({
      name: this.user.name,
      fullName: this.user.fullName,
      email: this.user.email,
      imgLink: this.user.imgLink
    });
  }
  onSaveUser() {
    this.user = this.prepareSaveUser();
    if (this.user._id === null) {
      this.addSeller();
    } else {
      this.updateSeller();
    }
  }
  updateSeller() {
    const updatedSeller = this._dataService.patch(`users/${this.user._id}`, this.user)
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
  onChangeAvatar(event) {

  }
  prepareSaveUser() {
    const formModel = this.userForm.value;
    const saveUser = {
      name: formModel.name as string,
      fullName: formModel.fullName as string,
      email: formModel.email as string,
      imgLink: formModel.imgLink as string
    };
    return saveUser;
  }
}
