import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../services/network/interceptor';
const routes: Routes = [{ path: '', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    SharedModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },],
})
export class LoginModule {}
