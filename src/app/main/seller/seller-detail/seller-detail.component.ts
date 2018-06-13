import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { Seller } from '../../../core/domain/seller.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SellerService } from '../seller.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DataService } from '../../../core/services/data.service';
import { SystemConstants } from '../../../core/common/system.constants';
import { MessageContstants } from '../../../core/common/message.constants';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.css']
})
export class SellerDetailComponent implements OnChanges {
  @Input() seller: Seller;
  @Output() updateList = new EventEmitter();

  sellerForm: FormGroup;
  nameChangeLog: string[] = [];
  // states = states;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private _notificationService: NotificationService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.sellerForm = this.fb.group({
      id: '',
      commonName: '',
      companyName: '',
      taxCode: ['', [Validators.required, Validators.minLength(10)]],
      address: ''
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.sellerForm.reset({
      id: this.seller.id,
      commonName: this.seller.commonName,
      companyName: this.seller.companyName,
      taxCode: this.seller.taxCode,
      address: this.seller.address
    });
    // this.setAddresses(this.seller.addresses);
  }

  onSubmit() {
    this.seller = this.prepareSaveSeller();
    if (this.seller.id === null) {
      this.addSeller();
    } else {
      this.updateSeller();
    }
  }
  updateSeller() {
    const updatedSeller = this._dataService.patch('sellers/' + this.seller.id, this.seller)
      .subscribe((res) => {
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        this.updateList.emit();
        return res.seller;
      }, (err) => this._dataService.handleError(err));
    this.rebuildForm();
  }
  addSeller() {
    const newSeller = this._dataService.post('sellers', this.seller)
      .subscribe((res) => {
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        this.updateList.emit();
        return res.seller;
      }, err => this._dataService.handleError(err));
    this.rebuildForm();
  }
  deleteSeller() {
    this.seller = this.prepareSaveSeller();
    const deletedSeller = this._dataService.deleteById('sellers/' + this.seller.id)
      .subscribe((res) => {
        this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
        this.seller = undefined;
        this.updateList.emit();
        return res.seller;
      }, (err) => this._dataService.handleError(err),
        () => this.seller = undefined);
  }

  prepareSaveSeller() {
    const formModel = this.sellerForm.value;
    const saveSeller = {
      id: formModel.id as string,
      commonName: formModel.commonName as string,
      companyName: formModel.companyName as string,
      taxCode: formModel.taxCode as string,
      address: formModel.address as string
    };
    return saveSeller;
  }

  revert() { this.rebuildForm(); }
  logNameChange() {
    const nameControl = this.sellerForm.get('commonName');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}
