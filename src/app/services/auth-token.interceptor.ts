import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if (!token) return next.handle(req);
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(authReq);
  }
}
