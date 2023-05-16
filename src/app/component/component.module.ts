import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentComponent } from './component.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../theme/theme.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../services/network/interceptor';
import { Resolver } from '../services/network/resolver';

const routes: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [
      {
        path: 'details',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsModule),
        resolve: { login: Resolver },
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('../pages/pages.module').then((m) => m.PagesModule),
        resolve: { login: Resolver },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ComponentComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    ThemeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  exports: [],
})
export class ComponentModule {}
