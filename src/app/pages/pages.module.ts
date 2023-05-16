import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
