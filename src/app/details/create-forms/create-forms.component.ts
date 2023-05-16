import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Global } from 'src/app/shared/global';
import { EstimationAction } from 'src/app/shared/model';

@Component({
  selector: 'app-create-forms',
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormsComponent implements OnInit {
  deptOptionForm: FormGroup;

  headerList: any = [
    'Shift',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  month: any = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  departmentName: any;
  departmentData: any;

  departmentList: any;
  defaultData: any;
  softWareList: any;
  groupedCollection: any;
  key: any;
  get estimations() {
    console.log(
      this.estimationForm.controls.estimation.controls
        ? this.estimationForm.controls.estimation.controls
        : ''
    );
    return this.estimationForm.controls.estimation.controls;
  }
  estimationForm: any = this.fb.group({
    estimation: this.fb.array([]),
  });
  changedId: number = -1;
  editCondition: any;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private CD: ChangeDetectorRef,
    private toast: ToasterService
  ) {
    this.deptOptionForm = this.getdeptOptionForm();
  }
  ngOnInit() {
    // this.departmentData = this.departmentDetails;
    // this.softWareData = this.softWareList;
    // this.createFormGroup(this.departmentDetails);

    this.getDefaultList();
  }
  iconToggle(i: number, type: boolean) {
    try {
      if (type) {
        this.estimationForm.controls.estimation['controls'][i]
          .get('editStatus')
          .setValue(true);

        this.estimationForm.controls.estimation['controls'][i]
          .get('saveStatus')
          .setValue(false);
      } else {
        this.estimationForm.controls.estimation['controls'][i]
          .get('editStatus')
          .setValue(false);

        this.estimationForm.controls.estimation['controls'][i]
          .get('saveStatus')
          .setValue(true);
      }
      this.CD.detectChanges();
    } catch (error) {}
  }
  editList(index: any) {
    try {
      this.iconToggle(index, false);
      let nextMonthList = this.month.slice(new Date().getMonth() + 1, 12);
      nextMonthList.forEach((element: any) => {
        this.estimationForm.controls.estimation['controls'][index]
          .get(element)
          .enable();
      });
      console.log('text');
    } catch (error) {}
  }
  rowSpanname(key: any) {}
  getTotal(month: string, key: any): number | any {
    try {
      let count = 0;
      let list = this.estimationForm?.get('estimation').getRawValue();
      let filterlist = list.filter((ele: any) => ele.projectName == key);
      filterlist.forEach((element: any) => {
        count += Number(element[month]);
      });
      return count;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for getting action form
   */
  getdeptOptionForm(iObj?: EstimationAction): FormGroup | any {
    try {
      let formGroup: FormGroup;
      if (iObj && Object.keys(iObj).length > 0) {
        formGroup = <FormGroup>this.fb.group({
          department: [iObj.department],
          software: [iObj.software],
          year: [iObj.year],
          // fromDatePicker: [iObj.fromDatePicker],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          department: ['0'],
          software: ['0'],
          year: ['0'],
          // fromDatePicker: [''],
        });
      }

      return formGroup;
    } catch (error) {
      console.error(error);
    }
  }
  getDefaultList() {
    try {
      let params = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
      };
      this.commonService.getEstimationData(params).subscribe(
        (res: any) => {
          if (res) {
            this.departmentList = res.Table;
            this.softWareList = res.Table1;
            this.CD.detectChanges();
          }
        },
        (err: Error) => {
          console.log(err);
        }
      );
      // getEstimationData
    } catch (error) {}
  }

  getData() {
    try {
      let values = this.deptOptionForm.getRawValue();
      let params = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
        departmentId: values.department,
        licenceId: values.software,
        year: values.year,
      };
      this.commonService.getEstimationListData(params).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            //clear form data
            (this.estimationForm.controls['estimation'] as FormArray).clear();

            // this.CD.detectChanges();
            // setTimeout(() => {
            res.Table?.forEach((element: any, i: any) => {
              this.addEstimation(element, i);
            });
            this.defaultData = res.Table;
            // const map = new Map();

            // let a = this.defaultData.forEach((element: any) => {
            //   map.set(element.projectName, element);
            // });
            // console.log('a', map);
            this.groupedCollection = this.defaultData.reduce(
              (previous: any, current: any) => {
                if (!previous[current['projectName']]) {
                  previous[current['projectName']] = [current];
                } else {
                  previous[current['projectName']].push(current);
                }
                return previous;
              },
              {}
            );
            console.log(this.groupedCollection);
            this.CD.detectChanges();
            // }, 0);
          }
        },
        (err: Error) => {
          console.log(err);
        }
      );
      //console.log(this.deptOptionForm.getRawValue());

      // let list = [values.department];
      // this.departmentData = [values.department];

      // this.createFormGroup(list);
    } catch (error) {}
  }
  getListData(key: any) {
    let list = this.estimationForm?.get('estimation').getRawValue();
    let filterlist = list.filter((ele: any) => ele.projectName == key);

    return filterlist;
  }

  /**
   * @author Sandesh
   * @description this function is used for showing department name
   */
  getDepartment() {
    try {
      if (this.departmentList && this.deptOptionForm.get('department')?.value) {
        let value = this.departmentList.filter((list: any) => {
          if (
            list.departmentId == this.deptOptionForm.get('department')?.value
          ) {
            return list.departmentId;
          }
        });

        return value[0].departmentName;
      }
    } catch (error) {}
  }

  /**
   * @author Sandesh
   * @description this function is used for create estimation form
   */
  createEstimationForm(iObj: any, index: number): FormGroup | any {
    try {
      let formGroup: FormGroup;

      formGroup = <FormGroup>this.fb.group({
        january: [{ value: iObj.january, disabled: true }],
        february: [{ value: iObj.february, disabled: true }],
        march: [{ value: iObj.march, disabled: true }],
        april: [{ value: iObj.april, disabled: true }],
        may: [{ value: iObj.may, disabled: true }],
        june: [{ value: iObj.june, disabled: true }],
        july: [{ value: iObj.july, disabled: true }],
        august: [{ value: iObj.august, disabled: true }],
        september: [{ value: iObj.september, disabled: true }],
        october: [{ value: iObj.october, disabled: true }],
        november: [{ value: iObj.november, disabled: true }],
        december: [{ value: iObj.december, disabled: true }],
        projectName: [iObj.projectName],
        shift: [iObj.shiftName],
        projectId: [iObj.projectId],
        shiftId: [iObj.shiftId],
        estimationId: [iObj.estimationId],
        index: [index],
        editStatus: [true],
        saveStatus: [false],
      });

      return formGroup;
    } catch (error) {}
  }

  /**
   * @author Sandesh
   * @description this function is used adding new row
   */
  addEstimation(iObj: any, index: number) {
    try {
      (this.estimationForm?.get('estimation') as FormArray).push(
        this.createEstimationForm(iObj, index)
      );
    } catch (error) {
      console.error(error);
    }
  }
  saveData(index: any) {
    let value = this.estimationForm.controls.estimation['controls']
      .at(index)
      .getRawValue();
    let optionValue = this.deptOptionForm.getRawValue();
    let params = {
      dbName: Global.LOGGED_IN_USER.dbName,
      dbPassword: Global.LOGGED_IN_USER.dbPassword,
      userId: Global.LOGGED_IN_USER.userId,
      departmentId: optionValue.department,
      licenceServerId: optionValue.software,
      year: optionValue.year,
      estimationId: value.estimationId,
      projectId: value.projectId,
      shiftId: value.shiftId,
      january: value.january,
      february: value.february,
      march: value.march,
      april: value.april,
      may: value.may,
      june: value.june,
      july: value.july,
      august: value.august,
      september: value.september,
      october: value.october,
      november: value.november,
      december: value.december,
      updatedBy: Global.LOGGED_IN_USER.userId,
    };
    // console.log(params);

    this.commonService.saveEstimationData(params).subscribe(
      (res: any) => {
        if (res) {
          this.toast.showSuccess('Data Saved Successfully'); // showError('User-ID / Password Combination Wrong.');
          this.iconToggle(index, true);
          this.estimationForm.controls.estimation['controls'].at(
            index
          ).value.estimationId = res;
          this.month.forEach((element: any) => {
            this.estimationForm.controls.estimation['controls'][index]
              .get(element)
              .disable();
          });
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
    console.log(params);
  }
}
