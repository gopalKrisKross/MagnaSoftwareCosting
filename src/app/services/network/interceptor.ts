import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, delay, finalize, Observable, of } from 'rxjs';
import { PubsubService } from '../pubsub/pubsub.service';
import { ToasterService } from '../toaster/toaster.service';
const skipLoaderForUrls = [
  'api/listing/departmentsTotalListing',
  'api/listing/commonDefaultListing',
];
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private pubsub: PubsubService, private toast: ToasterService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const getRelativeUrl = (url: any) => {
      return url.replace(/^.*\/\/[^\/]+\//g, '');
    };

    const isSkippedUrl = (url: any) => {
      return skipLoaderForUrls.find((serviceUrl) => serviceUrl === url);
    };
    if (isSkippedUrl(getRelativeUrl(request.url))) {
      return next.handle(request);
    }
    this.pubsub.showLoader(true);

    const customReq = request.clone({});
    return next.handle(customReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.toast.showError(
            'Oops!! Something went wrong. Please check your internet connection or try again after sometime.'
          );
        }
        return of(err);
      }),
      delay(0),
      finalize(() => {
        this.pubsub.showLoader(false);
      })
    );
  }
}
