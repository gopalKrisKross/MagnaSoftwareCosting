import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, delay, finalize, Observable, of } from 'rxjs';
import { PubsubService } from '../punsub/pubsub.service';

@Injectable()
export class IterceptorInterceptor implements HttpInterceptor {
  constructor(private pubsub: PubsubService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pubsub.showLoader(true);

    const customReq = request.clone({});
    return next.handle(customReq).pipe(
      catchError((err: any) => {
        return of(err);
      }),
      delay(1000),
      finalize(() => {
        this.pubsub.showLoader(false);
      })
    );
  }
}
