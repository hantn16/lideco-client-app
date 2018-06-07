import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { MessageContstants } from '../core/common/message.constants';
import { User } from '../core/domain/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnChanges {

  @Input() userModel: User;
  loginForm: FormGroup;

  loading = false;
  model: any = {};
  returnUrl;
  ngOnChanges(): void {
    this.loginForm.reset();
  }

  constructor(private _authenService: AuthenService, private _notificationService: NotificationService,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  }
  createForm(): any {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.loading = true;
    this.userModel = <User>{};
    this._authenService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(data => {
        this._notificationService.printSuccessMessage('Đăng nhập thành công');
        this.route.queryParams.subscribe((params => this.returnUrl = params['returnUrl']));
        const url = this.returnUrl ? this.returnUrl : UrlConstants.HOME;
        this.router.navigate([url]);
      }, error => {
        this._notificationService.printErrorMessage(error.message);
        this.loading = false;
      });
  }
  logout() {
    this._authenService.logout();
  }
}
