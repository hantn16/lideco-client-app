import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constants';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';
import { MessageContstants } from '../common/message.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _router: Router, private _notificationService: NotificationService,
    private _utilityService: UtilityService, private _authenService: AuthenService) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }
  addAuthenHeader() {
    this.headers.delete('x-auth');
    const authToken = localStorage.getItem(SystemConstants.ID_TOKEN);
    this.headers.append('x-auth', authToken);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  get(uri: string): Observable<any> {
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)));
  }
  post(uri: string, data?: any): Observable<any> {
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)));
  }
  delete(uri: string, key: string, id: string): Observable<any> {
    return this._http.delete(SystemConstants.BASE_API + uri + '/?' + key + '=' + id, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)));
  }
  deleteById(uri: string): Observable<any> {
    return this._http.delete(SystemConstants.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)));
  }
  patch(uri: string, data?: any): Observable<any> {
    return this._http.patch(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)));
  }
  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    } else if (error.status === 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utilityService.navigateToLogin();
    } else {
      const errMsg = JSON.parse(error._body).Message;
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
