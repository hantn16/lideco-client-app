import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../core/services/authen.service';
import { User } from '../../core/domain/user.model';
import { SystemConstants } from '../../core/common/system.constants';
import { UtilityService } from '../../core/services/utility.service';
import { DataService } from '../../core/services/data.service';
import { UrlConstants } from '../../core/common/url.constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  public user: User;
  public baseFolder: string = SystemConstants.BASE_API;
  constructor(private _authenService: AuthenService,
    private utilityService: UtilityService,
    private _dataService: DataService) {
  }

  ngOnInit() {
    this.user = this._authenService.getLoggedInUser();
  }
  logout() {
    this._authenService.logout();
  }

}
