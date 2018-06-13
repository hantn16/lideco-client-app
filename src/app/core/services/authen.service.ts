import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../domain/user.model';
import * as moment from 'moment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public token: string;
  public returnUrl: string;
  constructor(private _http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post(SystemConstants.BASE_API + 'users/login',
      JSON.stringify({ email: email, password: password }), {headers: headers})
      .pipe(tap(res => this.setSession(res)));
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem(SystemConstants.ID_TOKEN, authResult.idToken);
    localStorage.setItem(SystemConstants.EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
    return authResult;
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(SystemConstants.ID_TOKEN);
    localStorage.removeItem(SystemConstants.EXPIRES_AT);
  }
  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
  getExpiration(): any {
    const expiration = localStorage.getItem(SystemConstants.EXPIRES_AT);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getLoggedInUser(): User {
    let user: User = <User>{};
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'x-auth': localStorage.getItem(SystemConstants.ID_TOKEN)
    });
    if (this.isLoggedIn()) {
      this._http.get(SystemConstants.BASE_API + 'users/me', { headers: headers })
        .pipe().subscribe((result: User) => {
          user.email = result.email;
          user.name = result.name;
          user.fullName = result.fullName;
          user.imgLink = result.imgLink;
        });
    } else {
      user = null;
    }
    return user;
  }
}
