import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { CreateFormsComponent } from './create-forms/create-forms.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../theme/theme.module';
import { ActualUsageComponent } from './actual-usage/actual-usage.component';
import { MasterListComponent } from './master-list/master-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../services/network/interceptor';
import { Resolver } from '../services/network/resolver';
import { NbDatepickerModule } from '@nebular/theme';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      {
        path: 'create',
        component: CreateFormsComponent,
        resolve: { login: Resolver },
      },
      {
        path: 'costing',
        component: ActualUsageComponent,
        resolve: { login: Resolver },
      },
      {
        path: 'masterList/:pageType',
        component: MasterListComponent,
        resolve: { login: Resolver },
      },
    ],
  },
];
@NgModule({
  declarations: [
    CreateFormsComponent,
    DetailComponent,
    ActualUsageComponent,
    MasterListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    SharedModule,
    NbDatepickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class DetailsModule {}
