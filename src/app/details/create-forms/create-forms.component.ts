import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
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
    return this.estimationForm.controls.estimation.controls;
  }
  estimationForm: any = this.fb.group({
    estimation: this.fb.array([]),
  });
  changedId: number = -1;
  editCondition: any;
  softwareCount: number = 1;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private CD: ChangeDetectorRef,
    private toast: ToasterService,
    private pubsub: PubsubService
  ) {
    this.deptOptionForm = this.getdeptOptionForm();
  }
  ngOnInit() {
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
  /**
   * @author Sandesh
   * @description this function is used for enable disable and saving data
   */
  editList(index: any) {
    try {
      let nextMonthList: any = [];

      let values =
        this.estimationForm.controls.estimation['controls'][
          index
        ].getRawValue();
      let editValue = values.notAllowEstimationsEdit.split(',');

      if (editValue.length > 0) {
        this.iconToggle(index, false);

        this.pubsub.monthList.forEach((ele: any) => {
          // for (let item of editValue) {
          // if (item != ele.id) {
          if (!editValue.includes(ele.id)) {
            nextMonthList.push(ele.name.toLowerCase());
          }
          // }
        });
      } else {
        this.iconToggle(index, false);
        this.pubsub.monthList.forEach((ele: any) => {
          nextMonthList.push(ele.name.toLowerCase());
        });
      }
      if (nextMonthList && nextMonthList.length > 0)
        nextMonthList.forEach((element: any) => {
          this.estimationForm.controls.estimation['controls'][index]
            .get(element)
            .enable();
        });
    } catch (error) {}
  }

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
          department: [iObj.department, Validators.required],
          software: [iObj.software, Validators.required],
          year: [iObj.year, Validators.required],
          // fromDatePicker: [iObj.fromDatePicker],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          department: ['0', Validators.required],
          software: ['0', Validators.required],
          year: ['0', Validators.required],
          // fromDatePicker: [''],
        });
      }

      return formGroup;
    } catch (error) {
      console.error(error);
    }
  }
  trackByMethod(index: number, el: any): number {
    return el.tempRowId;
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
          console.error(err);
        }
      );
      // getEstimationData
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for getting estimation list
   */
  getData() {
    try {
      let values = this.deptOptionForm.getRawValue();
      // values.department > '0' &&
      if (
        values.department > '0' &&
        values.software > '0' &&
        values.year > '0'
      ) {
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
            if (res) {
              //clear form data
              (this.estimationForm.controls['estimation'] as FormArray).clear();
              //this function use for generate form group name form
              res.Table?.forEach((element: any, i: any) => {
                this.addEstimation(element, i);
              });
              this.defaultData = res.Table;
              //this function use for getting groupBy data
              this.groupedCollection = this.groupByData(
                this.defaultData,
                'projectName'
              );

              this.CD.detectChanges();
            }
          },
          (err: Error) => {
            console.error(err);
          }
        );
      }
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for set data in droupby
   */
  groupByData(list: any, type: string) {
    try {
      return list.reduce((previous: any, current: any) => {
        if (!previous[current[type]]) {
          previous[current[type]] = [current];
        } else {
          previous[current[type]].push(current);
        }
        return previous;
      }, {});
    } catch (error) {}
  }

  calculatShiftTotal(key: string, value: any): number | any {
    try {
      let count = 0;

      value.forEach((element: any) => {
        count += Number(element[key]);
      });

      return count;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for  filter list using project name
   */
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
        indexValue: [index],
        editStatus: [true],
        saveStatus: [false],
        notAllowEstimationsEdit: [iObj.notAllowEstimationsEdit],
        allowEstimationsEdit: [iObj.allowEstimationsEdit],
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
  /**
   * @author Sandesh
   * @description this function is use for set saving param
   */
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

    this.commonService.saveEstimationData(params).subscribe(
      (res: any) => {
        if (res) {
          this.toast.showSuccess('Data Saved Successfully');
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
  }
}
