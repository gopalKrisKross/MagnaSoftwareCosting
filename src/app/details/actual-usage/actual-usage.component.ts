import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-actual-usage',
  templateUrl: './actual-usage.component.html',
  styleUrls: ['./actual-usage.component.scss'],
})
export class ActualUsageComponent implements OnInit {
  // departmentDetails: any = ['EB', 'EC', 'EI', 'EV & ES', 'PM', 'E&E', 'IT'];
  data: any = [11, 23, 13, 17, 46, 27, 16];
  // departnentForm: any = new FormGroup({});
  usageOptionForm: FormGroup;
  // softWareList: any = ['CATIA', 'UG'];
  softwareList: any;
  departmentHoursData: any;
  actualUsageData: any;
  departmentList: any;
  departmentHoursDataList: any;
  showUsage: boolean = true;
  get monthList() {
    return this.pubsub.monthList;
  }
  get yearList() {
    return this.pubsub.yearList;
  }
  get departments() {
    return this.departmentForm?.controls.department.getRawValue();
  }
  actualEditOption: boolean = false;
  get editAdmin() {
    return Global.LOGGED_IN_USER.roleId != '0';
  }
  departmentForm: any = this.fb.group({
    department: this.fb.array([]),
  });
  subscriptions = new Subscription();
  disabledOption: boolean = false;
  constructor(
    private pubsub: PubsubService,
    private comService: CommonService,
    private fb: FormBuilder,
    private toast: ToasterService,
    private CD: ChangeDetectorRef
  ) {
    this.usageOptionForm = <FormGroup>this.createOptionForm();
  }

  ngOnInit(): void {
    this.getDefaultDataList();
    this.setSubscription();
  }
  /**
   * @author Sandesh
   * @description this function use for getting department list
   */
  getDefaultDataList() {
    try {
      let param = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.dbPassword,
        userId: Global.LOGGED_IN_USER.userId,
      };
      this.comService.getEstimationData(param).subscribe((res: any) => {
        this.softwareList = res.Table1;
        this.departmentList = res.Table;

        this.usageOptionForm.get('year')?.setValue(new Date().getFullYear());
        this.usageOptionForm.get('month')?.setValue(new Date().getMonth() + 1);
      });
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function use for  generate department form using formGroupNmae
   */
  createDepartmentForm(iObj: any, type: boolean): FormGroup | any {
    try {
      let formGroup: FormGroup;
      if (iObj && Object.keys(iObj).length > 0) {
        formGroup = <FormGroup>this.fb.group({
          departmentId: [iObj.departmentId],

          usageHours: [iObj.usageHours ? iObj.usageHours : 0.0],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          departmentId: [''],

          usageHours: [''],
        });
      }
      return formGroup;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function use for create actual usage form
   */
  createOptionForm(iObj: any = null): FormGroup | any {
    try {
      let formGroup: FormGroup;
      if (iObj && Object.keys(iObj).length > 0) {
        formGroup = <FormGroup>this.fb.group({
          software: [iObj.software, Validators.required],
          month: [iObj.month, Validators.required],
          year: [iObj.year, Validators.required],
          licence: [iObj.licence],
          avgCost: [{ value: iObj.avgCost, disabled: true }],
          totalCost: [iObj.totalCost],
          id: [iObj.id],
          actualUsageEdit: [iObj.actualUsageEdit],
          estimationEdit: [iObj.estimationEdit],
          usapeTabOptions: ['usageUpdate'],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          software: ['0', Validators.required],
          month: ['0', Validators.required],
          year: ['0', Validators.required],
          licence: ['0'],
          avgCost: [{ value: '0', disabled: true }],
          totalCost: ['0'],
          id: ['0'],
          actualUsageEdit: [false],
          estimationEdit: [false],
          usapeTabOptions: ['usageUpdate'],
        });
      }
      formGroup
        .get('usapeTabOptions')
        ?.valueChanges.subscribe((res: string) => {
          if (res == 'usageUpdate') {
            this.showUsage = true;
          } else {
            this.showUsage = false;
          }
        });
      return formGroup;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function use for save Actual usage data
   */
  saveActualUsage(type: string) {
    try {
      let values = this.usageOptionForm.getRawValue();

      if (
        this.usageOptionForm.valid &&
        values.software != '0' &&
        values.month != '0' &&
        values.year != '0' &&
        Global.LOGGED_IN_USER.roleId == '0'
      ) {
        let param = {
          dbName: Global.LOGGED_IN_USER.dbName,
          dbPassword: Global.LOGGED_IN_USER.dbPassword,
          userId: Global.LOGGED_IN_USER.userId,
          updatedBy: Global.LOGGED_IN_USER.userId,
          licenceServerId: values.software,
          month: values.month,
          year: values.year,

          licenceUsedCout: values.licence,
          totalCost: values.totalCost,
          averageCost: values.avgCost,

          departmentId: '0',
          usageHours: '0',

          moduleName: 'ActualUsage',
          entityId: values.id,
          actualUsageEdit: values.actualUsageEdit == true ? 1 : 0,
          estimationsEdit: values.estimationEdit == true ? 1 : 0,
        };

        this.comService.saveEditDeptActualUsage(param).subscribe((res: any) => {
          if (res > 0) {
            this.usageOptionForm.get('software')?.setValue(values.software);
            this.usageOptionForm.updateValueAndValidity();
            this.toast.showSuccess('Data Saved Successfully');
          }
        });
      } else {
        this.toast.showError('Please select all field');
      }
    } catch (error) {}
  }

  /**
   * @author Sandesh
   * @description this function is use for adding subscription
   */
  setSubscription() {
    this.subscriptions.add(
      combineLatest([
        this.usageOptionForm.get('software')?.valueChanges,
        this.usageOptionForm.get('month')?.valueChanges,
        this.usageOptionForm.get('year')?.valueChanges,
      ]).subscribe(([software, month, year]: any) => {
        if (software > 0 && month > 0 && year > 0) {
          let param = {
            dbName: Global.LOGGED_IN_USER.dbName,
            dbPassword: Global.LOGGED_IN_USER.dbPassword,
            userId: Global.LOGGED_IN_USER.userId,
            licenceId: software,
            month: month,
            year: year,
          };
          this.comService.getActualUsageListing(param).subscribe((res: any) => {
            this.actualUsageData = res.Table[0];
            this.departmentHoursData = res.Table1;

            this.setActualUsageData(this.actualUsageData);
            (this.departmentForm.controls['department'] as FormArray).clear();

            if (
              this.departmentHoursData &&
              this.departmentHoursData.length > 0
            ) {
              this.departmentHoursDataList = this.departmentHoursData;
              this.departmentHoursData?.forEach((element: any) => {
                this.addDepartment(element);
              });
            } else {
              this.departmentHoursDataList = this.departmentList;

              this.departmentList.forEach((element: any) => {
                this.addDepartment(element);
              });
            }

            // this.disableEnableFnc();
          });
        }
      })
    );
    this.subscriptions.add(
      combineLatest([
        this.usageOptionForm.get('licence')?.valueChanges,
        this.usageOptionForm.get('totalCost')?.valueChanges,
      ]).subscribe(([license, totalCost]: any) => {
        if (license && totalCost) {
          let avgCost = Number(totalCost) / Number(license);
          this.usageOptionForm
            .get('avgCost')
            ?.setValue(Number(avgCost).toFixed(2));
        } else {
          this.usageOptionForm.get('avgCost')?.setValue(0);
        }
      })
    );
  }
  setActualUsageData(list: any) {
    try {
      if (list && Object.keys(list).length > 0) {
        this.actualEditOption = !list.actualUsageEdit;
        this.usageOptionForm.get('licence')?.setValue(list.licenceUsedCout);
        this.usageOptionForm.get('avgCost')?.setValue(list.averageCost);
        this.usageOptionForm.get('totalCost')?.setValue(list.totalCost);
        this.usageOptionForm.get('id')?.setValue(list.id);
        this.usageOptionForm
          .get('estimationEdit')
          ?.setValue(list.estimationsEdit);
        this.usageOptionForm
          .get('actualUsageEdit')
          ?.setValue(list.actualUsageEdit);
      } else {
        this.actualEditOption = false;
        this.usageOptionForm.get('licence')?.setValue(0);

        this.usageOptionForm.get('avgCost')?.setValue(0);
        this.usageOptionForm.get('totalCost')?.setValue(0);
        this.usageOptionForm.get('id')?.setValue(0);
        this.usageOptionForm.get('estimationEdit')?.setValue(false);
        this.usageOptionForm.get('actualUsageEdit')?.setValue(false);
      }

      this.usageOptionForm.updateValueAndValidity();
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is use for set form group
   */
  addDepartment(iObj: any) {
    try {
      (this.departmentForm?.get('department') as FormArray).push(
        this.createDepartmentForm(iObj, true)
      );
    } catch (error) {
      console.error(error);
    }
  }
  disableEnableFnc() {
    try {
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;

      let selectedYear = this.usageOptionForm.get('year')?.value;
      let selectedMonth = this.usageOptionForm.get('month')?.value;

      if (selectedYear <= currentYear && selectedMonth <= currentMonth) {
        this.disabledOption = true;
      } else {
        this.disabledOption = false;
      }

      this.CD.detectChanges();
    } catch (error) {}
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  /**
   * @author Sandesh
   * @description this function is use for calculate department hours total
   */
  calculateTotal() {
    let controlesData = this.departmentForm?.controls.department.controls;
    let initialValue = 0;
    controlesData?.forEach((ele: any, i: number) => {
      let values = ele.getRawValue();
      let minutes: any = Number(values.usageHours);
      if (!isNaN(minutes)) {
        initialValue += Number(minutes);
      } else {
        initialValue += 0;
      }
    });
    return initialValue.toFixed(2);
  }

  saveDeptData() {
    try {
      if (Global.LOGGED_IN_USER.roleId == '0') {
        let list = this.departmentForm?.controls.department.getRawValue();
        let values = this.usageOptionForm.getRawValue();
        let param = {
          dbName: Global.LOGGED_IN_USER.dbName,
          dbPassword: Global.LOGGED_IN_USER.dbPassword,
          userId: Global.LOGGED_IN_USER.userId,
          updatedBy: Global.LOGGED_IN_USER.userId,
          licenceServerId: values.software,
          month: values.month,
          year: values.year,

          eArrayUseByDepartment: list,
        };

        this.comService.saveEditDepartment(param).subscribe((res: any) => {
          this.toast.showSuccess('Data Saved Successfully');
        });
      }
    } catch (error) {}
  }
  // getDepartmentNmae(id: number) {
  //   try {
  //     let list = this.departmentList.filter(
  //       (ele: any) => ele.departmentId == id
  //     );
  //     return list[0].departmentName;
  //   } catch (error) {}
  // }
}
