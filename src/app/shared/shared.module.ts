import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { CreateMasterFormComponent } from './create-master-form/create-master-form.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [SpinnerComponent, CreateMasterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ThemeModule],
  exports: [ReactiveFormsModule, SpinnerComponent],
})
export class SharedModule {}
