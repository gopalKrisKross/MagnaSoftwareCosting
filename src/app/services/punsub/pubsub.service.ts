import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PubsubService {
  loaderShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showLoader(show: boolean) {
    this.loaderShow$.next(show);
  }
  constructor() {}
}
