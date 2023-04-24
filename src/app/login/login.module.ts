import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [{ path: '', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    SharedModule,
  ],
})
export class LoginModule {}
