import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-forms',
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormsComponent implements OnInit {
  departnentForm: any = new FormGroup({});
  departmentDetails: any = [
    'TRIM',
    'BODY',
    'POWERTRAIN',
    'CAE',
    'PM',
    'E&E',
    'IT',
  ];
  data: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  shift: any = ['First', 'Gen', 'Sec'];
  departmentName: any;
  constructor() {}
  ngOnInit() {
    Array.from(this.departmentDetails).forEach((ele, idx) => {
      Array.from(this.shift).forEach((shift, idx) => {
        Array.from(this.data).forEach((no, idx) => {
          this.departnentForm.addControl(
            `${ele}${shift}${idx}`,
            new FormControl(no, Validators.required)
          );
        });
      });
    });
  }
  getData() {
    try {
    } catch (error) {}
  }
  saveData() {
    console.log(this.departnentForm.getRawValue());
    let obj = {};
    let arr: any = [];

    const deptFormaData = this.departnentForm.getRawValue();
    Array.from(this.departmentDetails).forEach((te, idx) => {
      let map = new Map();
      Object.keys(deptFormaData).forEach((key, i) => {
        // if (String(key).match(String(te))?.length > 0) {
        //   map.set(key, deptFormaData[key]);
        // }
      });
      arr[String(te)] = map;
    });
    console.log(arr);
  }
}
