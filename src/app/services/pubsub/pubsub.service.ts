import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PubsubService {
  loaderShow$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  showLoader(show: boolean) {
    this.loaderShow$.next(show);
  }
  isLoggedIn$() {
    return !!localStorage.getItem('Global.LOGGED_IN_USER');
  }
  reloadURL$: Subject<string> = new Subject();
  reloadURL(value: string) {
    this.reloadURL$.next(value);
  }
  readonly monthList: Array<any> = [
    {
      name: 'January',
      id: '1',
    },
    {
      name: 'February',
      id: '2',
    },
    {
      name: 'March',
      id: '3',
    },
    {
      name: 'April',
      id: '4',
    },
    {
      name: 'May',
      id: '5',
    },
    {
      name: 'June',
      id: '6',
    },
    {
      name: 'July',
      id: '7',
    },
    {
      name: 'August',
      id: '8',
    },
    {
      name: 'September',
      id: '9',
    },
    {
      name: 'October',
      id: '10',
    },
    {
      name: 'November',
      id: '11',
    },
    {
      name: 'December',
      id: '12',
    },
  ];
  readonly yearList: Array<any> = [
    {
      id: '2018',
      name: '2018',
    },
    {
      id: '2019',
      name: '2019',
    },
    {
      id: '2020',
      name: '2020',
    },
    {
      id: '2021',
      name: '2021',
    },
    {
      id: '2022',
      name: '2022',
    },
    {
      id: '2023',
      name: '2023',
    },
    {
      id: '2024',
      name: '2024',
    },
    {
      id: '2025',
      name: '2025',
    },
  ];
  constructor() {}
}
