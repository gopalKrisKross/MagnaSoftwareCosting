import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentComponent } from './component.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NbLayoutModule } from '@nebular/theme';
import { ThemeModule } from '../theme/theme.module';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [
      {
        path: 'details',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ComponentComponent, FooterComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    ThemeModule,
  ],
  exports: [],
})
export class ComponentModule {}
