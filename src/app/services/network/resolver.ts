import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PubsubService } from '../pubsub/pubsub.service';
import { Global } from 'src/app/shared/global';

@Injectable({
  providedIn: 'root',
})
export class Resolver implements Resolve<boolean> {
  constructor(private pubsub: PubsubService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.pubsub.isLoggedIn$()) {
      let details: any = localStorage.getItem('Global.LOGGED_IN_USER');
      Global.LOGGED_IN_USER = JSON.parse(details);
      return of(true);
    } else {
      return of(false);
    }
    return of(false);
  }
}
