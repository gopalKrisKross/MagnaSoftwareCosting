import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MasterForm } from '../action';
import { Global } from '../global';
import { CommonService } from 'src/app/services/common/common.service';
import { IMasterListAddEdit } from 'src/app/shared/model';
import { CommonFun } from '../lib';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
@Component({
  selector: 'app-create-master-form',
  templateUrl: './create-master-form.component.html',
  styleUrls: ['./create-master-form.component.scss'],
})
export class CreateMasterFormComponent implements OnInit {
  masterFormDetails: any = new MasterForm();
  masterForm: FormGroup;
  get userList() {
    return ['user'].includes(this.pageType.toLowerCase());
  }
  get shiftList() {
    return ['shift'].includes(this.pageType.toLowerCase());
  }
  get projectList() {
    return ['project'].includes(this.pageType.toLowerCase());
  }
  get f() {
    return this.masterForm.controls;
  }
  get entityId() {
    return this.entityList && Object.keys(this.entityList).length > 0
      ? this.entityList.id
      : '';
  }
  Title: string = '';
  entityList: any;
  pageType: string = '';
  TitleDetails: object | any = {
    Add: 'Create',
    Edit: 'Edit',
  };
  defaultDataList: object = {};
  table: any;
  table1: any;
  table2: any;
  table3: any;
  showPass: boolean = false;
  constructor(
    private dialogRef: NbDialogRef<any>,
    private fb: FormBuilder,
    private commonService: CommonService,
    private pubsub: PubsubService,
    private toast: ToasterService
  ) {
    this.masterForm = <FormGroup>this.getMasterForm(this.masterFormDetails);
  }

  ngOnInit(): void {
    console.log('dialogRef', this.dialogRef.componentRef.instance);
    this.Title = this.dialogRef.componentRef.instance.action;
    this.entityList = this.dialogRef.componentRef.instance.list;
    this.pageType = this.dialogRef.componentRef.instance.flag;
    console.log(this.Title);

    this.getDefaultData();
  }

  /**
   * @author Sandesh
   * @description this function is used for getting action form
   * @param iObj
   */
  getMasterForm(iObj?: MasterForm): FormGroup {
    let formGroup: FormGroup;
    if (iObj && Object.keys(iObj).length > 0) {
      formGroup = <FormGroup>this.fb.group({
        userId: [
          iObj.userId,
          [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)],
        ],
        name: [iObj.name, [Validators.required, Validators.pattern(/[^']/g)]],
        licenceServerID: [
          iObj.licenceServerID,
          [Validators.required, Validators.pattern(/[^']/g)],
        ],
        loginID: [iObj.loginID, [Validators.pattern(/[^']/g)]],
        password: [
          iObj.password,
          [
            Validators.required,
            //Minimum eight characters, at least one uppercase letter,
            // one lowercase letter, one number and one special character:
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: [iObj.confirmPassword],
        departmentID: [iObj.departmentID, [Validators.required]],
        licenceServerDeptID: [
          iObj.licenceServerDeptID,
          [Validators.required, Validators.pattern(/[^']/g)],
        ],
        status: [iObj.status, [Validators.required]],
        addedby: [iObj.addedby, [Validators.pattern(/[^']/g)]],
        BirthDate: [iObj.BirthDate],
        updatedby: [iObj.updatedby],
        updateDate: [iObj.updateDate],
        designation: [iObj.designation, [Validators.pattern(/[^']/g)]],
        reportingTo: [iObj.reportingTo],
        phoneNo: [iObj.phoneNo, [Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
        mobileNo: [iObj.mobileNo, [Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
        emailId: [
          iObj.emailId,
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
          ],
        ],
        roleId: [iObj.roleId],
        fromTime: [iObj.fromTime],
        toTime: [iObj.toTime],
        remark: [iObj.remark],
      });
    } else {
      formGroup = <FormGroup>this.fb.group({
        userId: [
          '',
          [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)],
        ],
        name: ['', [Validators.required, Validators.pattern(/[^']/g)]],
        licenceServerID: ['', [Validators.required]],
        loginID: [''],
        password: [
          '',
          [
            Validators.required,
            //Minimum eight characters, at least one uppercase letter,
            // one lowercase letter, one number and one special character:
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: [''],
        departmentID: ['', [Validators.required]],
        licenceServerDeptID: [
          '',
          [Validators.required, Validators.pattern(/[^']/g)],
        ],
        status: ['', [Validators.required]],
        addedby: [''],
        BirthDate: [''],
        updatedby: [''],
        updateDate: [''],
        designation: ['', [Validators.pattern(/[^']/g)]],
        reportingTo: [''],
        phoneNo: ['', [Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
        mobileNo: ['', [Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
        emailId: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
          ],
        ],
        roleId: [''],
        fromTime: [''],
        toTime: [''],
        remark: [''],
      });
    }
    return formGroup;
  }
  /**
   * @author Sandesh
   * @description this function is used for  close modal
   */
  close(type: boolean) {
    try {
      this.dialogRef.close();
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for get default data
   */
  getDefaultData() {
    try {
      let params = {
        dbName: Global.LOGGED_IN_USER.dbName,
        dbPassword: Global.LOGGED_IN_USER.password,
        userId: Global.LOGGED_IN_USER.userId,
        entityName: this.pageType,
        flage: this.Title,
        entityId: this.entityId,
      };
      console.log(params);
      this.commonService.masterList(params).subscribe((res: any) => {
        console.log(res);
        this.table = res.Table;
        this.table1 = res.Table1;
        this.table2 = res.Table2;
        // this.table3 = res.Table3;
        if (this.pageType == 'User') {
          this.setDefaultData(res.Table3);
        } else {
          this.setDefaultData(res.Table);
        }
      });
    } catch (error) {}
  }
  setDefaultData(list: any) {
    try {
      if (this.Title == 'Edit') {
        this.masterForm.get('userId')?.disable();
        this.masterForm.get('password')?.clearValidators();
        this.masterForm.get('password')?.setErrors(null);
        this.masterForm.updateValueAndValidity();
      } else if (this.Title == 'Add') {
        this.masterForm.get('status')?.disable();
      }
      if (list && Object.keys(list).length > 0) {
        this.masterForm.get('name')?.setValue(list[0].name);
        this.masterForm
          .get('licenceServerID')
          ?.setValue(list[0].licenceServerId);

        this.masterForm.get('departmentID')?.setValue(list[0].departmentId);
        this.masterForm.get('emailId')?.setValue(list[0].emailId);
        this.masterForm.get('roleId')?.setValue(list[0].roleId);
        this.masterForm
          .get('licenceServerDeptID')
          ?.setValue(list[0].licenceServerDepartmentId);
        this.masterForm.get('status')?.setValue(list[0].status);
        this.masterForm.get('addedby')?.setValue('');

        this.masterForm.get('BirthDate')?.setValue(new Date(list[0].birthDate));
        this.masterForm.get('updatedby')?.setValue('');
        this.masterForm.get('updateDate')?.setValue('');
        this.masterForm.get('designation')?.setValue(list[0].designation);
        this.masterForm
          .get('reportingTo')
          ?.setValue(list[0].reportingTo ? list[0].reportingTo : 0);
        this.masterForm.get('phoneNo')?.setValue(list[0].phoneNumber);
        this.masterForm.get('userId')?.setValue(list[0].id);
        this.masterForm.get('mobileNo')?.setValue(list[0].mobileNumber);
        let d = new Date();
        let d1 = new Date();

        let [hours, minutes, seconds] = list[0].fromTime
          ? list[0].fromTime.split(':')
          : '';
        d.setHours(hours), d.setMinutes(minutes), d.setSeconds(seconds);

        this.masterForm.get('fromTime')?.setValue(new Date(d));

        [hours, minutes, seconds] = list[0].toTime
          ? list[0].toTime.split(':')
          : '';
        d.setHours(hours), d.setMinutes(minutes), d.setSeconds(seconds);

        this.masterForm.get('toTime')?.setValue(new Date(d));
        this.masterForm.get('remark')?.setValue(list[0].remark);
      } else {
        this.masterForm.get('departmentID')?.setValue(0);
        this.masterForm.get('BirthDate')?.setValue(new Date());
        this.masterForm.get('fromTime')?.setValue(new Date());
        this.masterForm.get('toTime')?.setValue(new Date());
        this.masterForm.get('status')?.setValue(true);
        this.masterForm.get('roleId')?.setValue(-1);
        this.masterForm.get('reportingTo')?.setValue(0);
      }
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for Save Form
   */
  saveDetails() {
    try {
      debugger;
      let val: boolean = false;
      if (this.masterForm.valid && this.pageType == 'User') {
        val = true;
      } else if (
        this.pageType != 'User' &&
        this.masterForm.get('name')?.value
      ) {
        val = true;
      } else {
        val = false;
      }
      if (val) {
        this.getParams(this.pageType)
          .then((param) => {
            console.log(param);

            this.commonService.masterListAddEdit(param).subscribe(
              (res: any) => {
                if (res != '0') {
                  this.close(true);
                  this.pubsub.reloadURL(this.pageType);
                  this.toast.showSuccess('Data Saved Successfully');
                }
              },
              (err: Error) => {
                console.error(err);
              }
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {}
  }
  /**
   * @author Sandesh
   * @description this function is used for set params
   *
   */
  getParams(pageType: string): Promise<IMasterListAddEdit> {
    let params: IMasterListAddEdit | any;
    return new Promise((resolve, reject) => {
      let values = this.masterForm.getRawValue();

      switch (pageType) {
        case 'User':
          params = {
            dbName: Global.LOGGED_IN_USER.dbName, //'MagnaLicenseUsage' ,
            dbPassword: Global.LOGGED_IN_USER.dbPassword, // 'sa@123456789',
            userId: Global.LOGGED_IN_USER.userId, // '001',
            roleId: values.roleId, // '6', // values.roleId,
            moduleName: pageType, // 'User',
            flage: this.Title, // 'Edit',
            entityId: values.userId, //'010', //userId
            entityName: values.name, // 'Coordinator3 User', // values.name
            emailId: values.emailId, // 'coordinator3@noemail.com', //values.emailId
            password: values.password, // '123456789', //values.password

            departmentId: values.departmentID, // '1', //values.departmentID
            licenceServerId: values.licenceServerID, // '2', //values.licenceServerID
            licenceServerDepartmentId: values.licenceServerDeptID, // '3', //values.licenceServerDeptID
            reportingTo: values.reportingTo, // '002', //values.reportingTo
            mobileNumber: values.mobileNo, // '987654310', //values.mobileNo
            phoneNumber: values.phoneNo, // '123456789', //values.phoneNo
            designation: values.designation, // 'Coordinator', //values.designation
            birthDate: CommonFun.formatDate('YYYY-MM-DD', values.BirthDate), //'1995-01-01', //values.BirthDate
            updatedBy: Global.LOGGED_IN_USER.userId, // '001',
            status: values.status == true ? 1 : 0, // 0, //values.status
          };
          break;
        case 'Department':
        case 'SoftwareLicence':
          params = {
            dbName: Global.LOGGED_IN_USER.dbName, //'MagnaLicenseUsage' ,
            dbPassword: Global.LOGGED_IN_USER.dbPassword, // 'sa@123456789',
            userId: Global.LOGGED_IN_USER.userId, // '001',

            moduleName: pageType, // 'User',
            flage: this.Title, // 'Edit',
            entityId: this.entityId ? this.entityId : '', //'010', //userId
            entityName: values.name, // 'Coordinator3 User', // values.name

            updatedBy: Global.LOGGED_IN_USER.userId, // '001',
            status: values.status == true ? 1 : 0, // 0, //values.status
          };
          break;
        case 'Project':
          params = {
            dbName: Global.LOGGED_IN_USER.dbName, //'MagnaLicenseUsage' ,
            dbPassword: Global.LOGGED_IN_USER.dbPassword, // 'sa@123456789',
            userId: Global.LOGGED_IN_USER.userId, // '001',

            moduleName: pageType, // 'User',
            flage: this.Title, // 'Edit',
            entityId: this.entityId ? this.entityId : '', //'010', //userId
            entityName: values.name, // 'Coordinator3 User', // values.name

            updatedBy: Global.LOGGED_IN_USER.userId, // '001',
            status: values.status == true ? 1 : 0, // 0, //values.status
            remark: values.remark, // 0, //values.status
          };
          break;
        case 'Shift':
          params = {
            dbName: Global.LOGGED_IN_USER.dbName, //'MagnaLicenseUsage' ,
            dbPassword: Global.LOGGED_IN_USER.dbPassword, // 'sa@123456789',
            userId: Global.LOGGED_IN_USER.userId, // '001',

            moduleName: pageType, // 'User',
            flage: this.Title, // 'Edit',
            entityId: this.entityId ? this.entityId : '', //'010', //userId
            entityName: values.name, // 'Coordinator3 User', // values.name
            status: values.status == true ? 1 : 0, // 0, //values.status
            updatedBy: Global.LOGGED_IN_USER.userId, // '001',
            shiftFromTime: CommonFun.formatDate('HH:mm:ss', values.fromTime), // 0, //values.status
            shiftToTime: CommonFun.formatDate('HH:mm:ss', values.toTime), // 0, //values.status
          };
          break;
        default:
          break;
      }
      resolve(params);
    });
  }
}
