import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem(SystemConstants.ID_TOKEN);
        if (idToken) {
            const cloned = req.clone({
                setHeaders: { 'x-auth': idToken }
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
