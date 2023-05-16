import { Component, OnInit } from '@angular/core';
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
import { IDeptActualUsageParam } from 'src/app/shared/model';

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
  get monthList() {
    return this.pubsub.monthList;
  }
  get yearList() {
    return this.pubsub.yearList;
  }
  departmentForm: any = this.fb.group({
    department: this.fb.array([]),
  });
  subscriptions = new Subscription();
  constructor(
    private pubsub: PubsubService,
    private comService: CommonService,
    private fb: FormBuilder,
    private toast: ToasterService
  ) {
    this.usageOptionForm = <FormGroup>this.createOptionForm();
  }

  ngOnInit(): void {
    // this.createFormGroup();
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
        console.log(res);
      });
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function use for  generate department form using formGroupNmae
   */
  createDepartmentForm(iObj: any): FormGroup | any {
    try {
      let formGroup: FormGroup;
      if (iObj && Object.keys(iObj).length > 0) {
        formGroup = <FormGroup>this.fb.group({
          departmentId: [iObj.departmentId],
          id: [iObj.id],
          licenceId: [iObj.licenceId],
          month: [iObj.month],
          status: [iObj.status],
          usageHours: [iObj.usageHours],
          year: [iObj.year],
        });
      } else {
        formGroup = <FormGroup>this.fb.group({
          departmentId: [''],
          id: [''],
          licenceId: [''],
          month: [''],
          status: [''],
          usageHours: [''],
          year: [''],
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
          id: [iObj.totalCost],
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
        });
      }

      return formGroup;
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function use for save Actual usage data
   */
  saveActualUsage(type: string) {
    try {
      if (this.usageOptionForm.valid) {
        this.getSaveParams(type).then((params: any) => {
          console.log(params);

          this.comService
            .saveEditDeptActualUsage(params)
            .subscribe((res: any) => {
              if (res > 0) {
                this.toast.showSuccess('Data Saved Successfully');
              }
            });
        });
      }
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is use for set param for department and actual usage
   */
  getSaveParams(type: string): Promise<IDeptActualUsageParam> | any {
    try {
      return new Promise<IDeptActualUsageParam>((resolve, reject) => {
        let values = this.usageOptionForm.getRawValue();
        let param = {
          dbName: Global.LOGGED_IN_USER.dbName,
          dbPassword: Global.LOGGED_IN_USER.dbPassword,
          userId: Global.LOGGED_IN_USER.userId,
          updatedBy: Global.LOGGED_IN_USER.userId,
          licenceServerId: values.software,
          month: values.month,
          year: values.year,

          licenceUsedCout: 0,
          totalCost: 0,
          averageCost: 0,

          departmentId: '0',
          usageHours: '0',

          moduleName: '',
          entityId: '0',
        };
        switch (type) {
          case 'ActualUsage':
            param.licenceUsedCout = values.licence;
            param.totalCost = values.totalCost;
            param.averageCost = values.avgCost;
            param.moduleName = 'ActualUsage';
            param.entityId = values.id;

            break;
          case 'UseByDepartment':
            param.departmentId = '0';
            param.usageHours = '0';

            param.moduleName = '';
            param.entityId = '0';
            break;
        }
        resolve(param);
      });
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
            console.log(res);
            this.actualUsageData = res.Table[0];
            this.departmentHoursData = res.Table1;
            this.setActualUsageData(this.actualUsageData);
            (this.departmentForm.controls['department'] as FormArray).clear();

            this.departmentHoursData?.forEach((element: any) => {
              this.addDepartment(element);
            });
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
        this.usageOptionForm.get('licence')?.setValue(list.licenceUsedCout);
        this.usageOptionForm.get('avgCost')?.setValue(list.averageCost);
        this.usageOptionForm.get('totalCost')?.setValue(list.totalCost);
        this.usageOptionForm.get('id')?.setValue(list.id);
      } else {
        this.usageOptionForm.get('licence')?.setValue(0);
        this.usageOptionForm.get('avgCost')?.setValue(0);
        this.usageOptionForm.get('totalCost')?.setValue(0);
        this.usageOptionForm.get('id')?.setValue(0);
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
        this.createDepartmentForm(iObj)
      );
    } catch (error) {
      console.error(error);
    }
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
    controlesData?.forEach((ele: any) => {
      let values = ele.getRawValue();
      initialValue += Number(values.usageHours);
    });
    return initialValue;
  }
  getDepartmentNmae(id: number) {
    try {
      let list = this.departmentList.filter(
        (ele: any) => ele.departmentId == id
      );
      return list[0].departmentName;
    } catch (error) {}
  }
}
