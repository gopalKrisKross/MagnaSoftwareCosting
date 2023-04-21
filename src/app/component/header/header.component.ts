import { Component, OnInit } from '@angular/core';

import { NbSidebarService, NbThemeService } from '@nebular/theme';
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

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  constructor(
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService
  ) {}

  ngOnInit() {
    //   this.currentTheme = this.themeService.currentTheme;
    //   const { xl } = this.breakpointService.getBreakpointsMap();
    //   this.themeService
    //     .onMediaQueryChange()
    //     .pipe(
    //       map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //       takeUntil(this.destroy$)
    //     )
    //     .subscribe(
    //       (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
    //     );
    //   this.themeService
    //     .onThemeChange()
    //     .pipe(
    //       map(({ name }) => name),
    //       takeUntil(this.destroy$)
    //     )
    //     .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    // this.menuService.navigateHome();
    return false;
  }
}
