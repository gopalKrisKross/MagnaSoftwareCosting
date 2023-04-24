import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbDatepickerModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbMomentDateModule } from '@nebular/moment';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    NbSelectModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbMomentDateModule,
    NbSpinnerModule,
  ],
  exports: [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbSelectModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbSpinnerModule,
  ],
  declarations: [],
})
export class ThemeModule {}
