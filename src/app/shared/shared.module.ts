import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class SharedModule {}
