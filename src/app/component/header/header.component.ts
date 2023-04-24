import { Component, OnInit } from '@angular/core';

import {
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile' },
    { title: 'Log out' },
    {
      title: 'Select Theme',
      children: [
        {
          title: 'Corporate',
        },
        {
          title: 'Cosmic',
        },
        {
          title: 'Dark',
        },
        {
          title: 'Default',
        },
      ],
    },
  ];
  constructor(
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService
  ) {}

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event: any) => {
      console.log(event);
      switch (event.item.title.toLowerCase()) {
        case 'profile':
          break;
        case 'log out':
          break;
        case 'corporate':
        case 'cosmic':
        case 'dark':
        case 'default':
          this.changeTheme(event.item.title.toLowerCase());
          break;

        default:
          break;
      }
      console.log();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    console.log('fire');
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
