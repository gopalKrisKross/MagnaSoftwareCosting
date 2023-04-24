import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { CreateFormsComponent } from './create-forms/create-forms.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../theme/theme.module';
import { ActualUsageComponent } from './actual-usage/actual-usage.component';
const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      {
        path: 'create',
        component: CreateFormsComponent,
      },
      {
        path: 'costing',
        component: ActualUsageComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [CreateFormsComponent, DetailComponent, ActualUsageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    SharedModule,
  ],
})
export class DetailsModule {}
