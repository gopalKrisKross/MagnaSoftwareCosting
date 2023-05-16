// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedModule } from './shared/shared.module';

// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { DetailsModule } from './details/details.module';
// import { NbDatepickerModule, NbThemeModule } from '@nebular/theme';
// import { NbEvaIconsModule } from '@nebular/eva-icons';
// import { LoginModule } from './login/login.module';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { Interceptor } from './services/network/interceptor';
// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     SharedModule,
//     FormsModule,
//     ReactiveFormsModule,
//     DetailsModule,
//     NbThemeModule.forRoot({ name: 'corporate' }),
//     NbEvaIconsModule,
//     LoginModule,
//     HttpClientModule,
//   ],

//   providers: [
//     { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailsModule } from './details/details.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbThemeModule,
  NbTimepickerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './services/network/interceptor';
import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DetailsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    LoginModule,
    HttpClientModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'DD-MMM-yyyy' }),
    NbTimepickerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
