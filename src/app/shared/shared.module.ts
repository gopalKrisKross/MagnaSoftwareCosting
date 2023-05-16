// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { SpinnerComponent } from './spinner/spinner.component';
// import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';
// import { ThemeModule } from '../theme/theme.module';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
// import { Interceptor } from '../services/network/interceptor';

// @NgModule({
//   declarations: [SpinnerComponent, CreateMasterFormComponent],
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     ThemeModule,
//     HttpClientModule,
//     ToastrModule.forRoot({
//       timeOut: 5000,
//       closeButton: true,
//       progressBar: true,
//     }),
//   ],
//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
//   ],
//   exports: [ReactiveFormsModule, SpinnerComponent],
// })
// export class SharedModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';
import { ThemeModule } from '../theme/theme.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../services/network/interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [SpinnerComponent, CreateMasterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
    }),
    NbDatepickerModule,
    NbTimepickerModule,
    NgxPaginationModule,
  ],
  exports: [ReactiveFormsModule, SpinnerComponent, NgxPaginationModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class SharedModule {}
