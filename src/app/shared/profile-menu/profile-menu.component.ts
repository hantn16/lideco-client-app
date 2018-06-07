import { Component, OnInit } from '@angular/core';
import { User } from '../../core/domain/user';
import { SystemConstants } from '../../core/common/system.constants';
import { AuthenService } from '../../core/services/authen.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {


  public user: User;
  public baseFolder: string = SystemConstants.BASE_API;
  constructor(private _authenService: AuthenService) {
    this.user = this._authenService.getLoggedInUser();
  }
  ngOnInit() {
  }

}
