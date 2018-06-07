import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _dataService: DataService) {}
  getListUsers = () => {
    return this._dataService.get('users/getall');
  }
}
