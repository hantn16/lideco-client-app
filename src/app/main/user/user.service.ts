import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { map } from 'rxjs/operators';
import { User } from '../../core/domain/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();
  constructor(private _dataService: DataService) { }
  getListUsers = () => {
    this._dataService.get('users/getall').pipe(map(data => {
      return data.users.map(user => {
        return this.convert2UserModel(user);
      });
    })).subscribe(transformedUsers => {
      this.users = transformedUsers;
      this.usersUpdated.next([...this.users]);
    });
  }
  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }
  getUserById = (id: string) => {
    return this._dataService.get(`user/${id}`);
  }
  addUser(email: string, name: string, fullName: string, avatar: File) {
    const userData = new FormData();
    userData.append('email', email);
    userData.append('name', name);
    userData.append('fullName', fullName);
    userData.append('avatar', avatar, email);
    this._dataService.post(`users`, userData)
      .subscribe(responseData => {
        const user: User = this.convert2UserModel(responseData.user);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
      });
  }
  updateUser(id: string, email: string, name: string, fullName: string, avatar: File | string) {
    let userData: User | FormData;
    if (typeof avatar === 'object') {
      userData = new FormData();
      userData.append('id', id);
      userData.append('email', email);
      userData.append('name', name);
      userData.append('fullName', fullName);
      userData.append('avatar', avatar, email);
    } else {
      userData = {
        id: id,
        email: email,
        name: name,
        fullName: fullName,
        imgLink: avatar
      };
    }
    this._dataService.patch(`users/${id}`, userData)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(p => p.id === id);
        const user: User = this.convert2UserModel(response.user);
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
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
