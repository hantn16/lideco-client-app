import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authen.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
