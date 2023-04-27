import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EstimationAction } from 'src/app/shared/model';

@Component({
  selector: 'app-create-forms',
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormsComponent implements OnInit {
  departnentForm: any = new FormGroup({});
  deptOptionForm: FormGroup;
  departmentDetails: any = [
    'TRIM',
    'BODY',
    'POWERTRAIN',
    // 'CAE',
    // 'PM',
    'E&E',
    // 'IT',
  ];
  softWareList: any = ['CATIA', 'UG'];
  softWareData: any;
  headerList: any = [
    'Shift',
    'Jan-23',
    'Feb-23',
    'Mar-23',
    'Apr-23',
    'May-23',
    'Jun-23',
    'Jul-23',
    'Aug-23',
    'Sep-23',
    'Oct-23',
    'Nov-23',
    'Dec-23',
  ];
  data: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  shift: any = ['First', 'Gen', 'Sec'];
  departmentName: any;
  departmentData: any;
  project: any = [
    {
      key: 'TRIM',
      value: 'ME-Troy',
    },
    {
      key: 'TRIM',
      value: 'ME-UK',
    },
    {
      key: 'TRIM',
      value: 'MSE-AUT (PANTHERA)',
    },
    {
      key: 'TRIM',
      value: 'MS-AUT (JUPITAR & INEOS)',
    },
    {
      key: 'BODY',
      value: 'MEI',
    },
    {
      key: 'BODY',
      value: 'Eicher',
    },
    {
      key: 'BODY',
      value: 'Mahindra UPP',
    },
    {
      key: 'POWERTRAIN',
      value: 'MPT TS ',
    },
    {
      key: 'POWERTRAIN',
      value: 'ECS',
    },
    {
      key: 'POWERTRAIN',
      value: 'MPT DS',
    },
    {
      key: 'E&E',
      value: 'SMC',
    },
    {
      key: 'E&E',
      value: 'T2K',
    },
  ];
  constructor(private fb: FormBuilder) {
    this.deptOptionForm = this.getdeptOptionForm();
  }
  ngOnInit() {
    // this.departmentData = this.departmentDetails;
    this.softWareData = this.softWareList;
    this.createFormGroup(this.departmentDetails);
  }
  createFormGroup(list: any) {
    try {
      console.log(list);
      Array.from(list).forEach((ele, idx) => {
        Array.from(this.shift).forEach((shift, idx) => {
          Array.from(this.data).forEach((no, idx) => {
            this.departnentForm.addControl(
              `${ele}${shift}${idx}`,
              new FormControl(no, Validators.required)
            );
          });
        });
      });
    } catch (error) {}
  }
  getProject(obj: string) {
    try {
      console.log(this.project.filter((x: any) => x.key == obj));
      return this.project.filter((x: any) => x.key == obj);
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for getting action form
   */
  getdeptOptionForm(iObj?: EstimationAction): any {
    try {
      let formGroup: FormGroup;
      if (iObj && Object.keys(iObj).length > 0) {
        formGroup = <FormGroup>this.fb.group({
          department: [iObj.department],
          software: [iObj.software],
          toDatePicker: [iObj.toDatePicker],
          fromDatePicker: [iObj.fromDatePicker],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          department: [''],
          software: [''],
          toDatePicker: [''],
          fromDatePicker: [''],
        });
      }

      return formGroup;
    } catch (error) {
      console.error(error);
    }
  }
  getCalTotal(no: any): any {
    try {
      return Number(no) * 3;
    } catch (error) {}
  }
  // default : #e2bae2
  getData() {
    try {
      debugger;
      console.log(this.deptOptionForm.getRawValue());
      let values = this.deptOptionForm.getRawValue();
      let list = [values.department];
      this.departmentData = [values.department];

      this.createFormGroup(list);
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
