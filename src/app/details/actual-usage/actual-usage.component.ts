import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actual-usage',
  templateUrl: './actual-usage.component.html',
  styleUrls: ['./actual-usage.component.scss'],
})
export class ActualUsageComponent implements OnInit {
  departmentDetails: any = ['EB', 'EC', 'EI', 'EV & ES', 'PM', 'E&E', 'IT'];
  data: any = [11, 23, 13, 17, 46, 27, 16];
  departnentForm: any = new FormGroup({});
  softWareList: any = ['CATIA', 'UG'];
  constructor() {}

  ngOnInit(): void {
    this.createFormGroup();
  }
  createFormGroup() {
    try {
      Array.from(this.departmentDetails).forEach((ele, idx) => {
        // Array.from(this.data).forEach((no, idx) => {
        this.departnentForm.addControl(
          `${ele} `,
          new FormControl(this.data[idx], Validators.required)
        );
        // });
      });
    } catch (error) {}
  }
  calculateTotal() {
    const initialValue = 0;
    return this.data.reduce(
      (accumulator: any, currentValue: any) =>
        Number(accumulator) + Number(currentValue),
      initialValue
    );
  }
}
