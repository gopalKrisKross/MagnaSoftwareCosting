import { Imaster } from './model';

export class MasterForm implements Imaster {
  userId: string | number;
  name: string;
  licenceServerID: string | number;
  loginID: string | number;
  password: string;
  departmentID: string | number;
  licenceServerDeptID: string | number;
  status: any;
  addedby: string;
  BirthDate: string;
  fromTime: string;
  toTime: string;
  updatedby: string;
  updateDate: string;
  designation: string;
  reportingTo: string;
  emailId: string;
  phoneNo: string | number;
  mobileNo: string | number;
  roleId: string | number;
  confirmPassword: string;
  remark: string;
  constructor(
    userId: string | number = '',
    name: string = '',
    licenceServerID: string | number = '',
    loginID: string | number = '',
    password: string = '',
    confirmPassword: string = '',
    departmentID: string | number = '',
    licenceServerDeptID: string | number = '',
    status: any = '',
    addedby: string = '',
    BirthDate: string = '',
    fromTime: string = '',
    toTime: string = '',
    updatedby: string = '',
    updateDate: string = '',
    designation: string = '',
    reportingTo: string = '',
    emailId: string = '',
    remark: string = '',
    phoneNo: string | number = '',
    mobileNo: string | number = '',
    roleId: string | number = ''
  ) {
    this.userId = userId;
    this.name = name;
    this.licenceServerID = licenceServerID;
    this.loginID = loginID;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.departmentID = departmentID;
    this.licenceServerDeptID = licenceServerDeptID;
    this.status = status;
    this.addedby = addedby;
    this.BirthDate = BirthDate;
    this.updatedby = updatedby;
    this.updateDate = updateDate;
    this.designation = designation;
    this.reportingTo = reportingTo;
    this.phoneNo = phoneNo;
    this.mobileNo = mobileNo;
    this.emailId = emailId;
    this.roleId = roleId;
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.remark = remark;
  }
}
