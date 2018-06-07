import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SystemConstants } from '../../core/common/system.constants';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from '../services/authen.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenService: AuthenService) {

    }
    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        const url: string = routerState.url;
        return this.checkLogin(url);
    }
    checkLogin(url: string): boolean {
        if (localStorage.getItem(SystemConstants.EXPIRES_AT)) {
            const kq = this.authenService.isLoggedIn();
            if (!kq) {
                this.authenService.returnUrl = url;
                this.router.navigate([UrlConstants.LOGIN], {
                    queryParams: {
                        returnUrl: url
                    }
                });
                return kq;
            }
            return true;
        } else {
            this.authenService.returnUrl = url;
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: url
                }
            });
            return false;
        }
    }
}
