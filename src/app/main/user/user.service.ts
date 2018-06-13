import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { map } from 'rxjs/operators';
import { User } from '../../core/domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _dataService: DataService) { }
  getListUsers = (): User[] => {
    const convertedUsers = [] as User[];
    this._dataService.get('users/getall').pipe(map((res) => {
      res.array.forEach(user => {
        convertedUsers.push(this.convert2UserModel(user));
      });
    }));
    return convertedUsers;
  }
  getUserById = (id: string): User => {
    let user;
    this._dataService.get(`user/${id}`)
      .pipe(map((res) => user = this.convert2UserModel(res)));
    return user;
  }
  convert2UserModel = (user): User => {
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      fullName: user.fullName,
      imgLink: user.imgLink
    };
  }
}
