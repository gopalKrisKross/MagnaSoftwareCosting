import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { NavigationService } from '../services/navigation/navigation.service';
import { PubsubService } from '../services/pubsub/pubsub.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private nav: NavigationService, private pubsub: PubsubService) {}
  async canActivate() {
    const isLoggedIn = this.pubsub.isLoggedIn$();

    if (isLoggedIn) {
      return true;
    } else {
      this.nav.gotoPage('/login', null, (res: any) => {});
      return false;
    }
  }
}
