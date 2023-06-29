export interface EstimationAction {
  department: string;
  software: string;
  year: string;
  // toDatePicker: string;
  // fromDatePicker: string;
}
export interface Imaster {
  userId: number | string;
  name: string;
  licenceServerID: number | string;
  loginID: number | string;
  password: string;
  confirmPassword: string;
  departmentID: number | string;
  licenceServerDeptID: number | string;
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
  remark: string;
  phoneNo: string | number;
  mobileNo: string | number;
  roleId: string | number;
}
export interface ILoginDetails {
  emailId: string;
  password: string;
}
export interface IMasterList {
  dbName: string;
  dbPassword: string;
  userId: string | number;
  entityName: string | any;
  flage: string;
  entityId: string | number;
}
export interface IUser {
  dbName: string;
  dbPassword: string;
  emailId: string;
  password: string;
  roleId: number | string;
  status: boolean;
  userId: number | string;
  userName: string;
}
export interface IMasterListAddEdit {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  moduleName: string;
  flage: string;
  entityId: number | string;
  entityName: string;
  emailId: string;
  password: string;
  roleId: number | string;
  departmentId: number | string;
  licenceServerId: number | string;
  licenceServerDepartmentId: number | string;
  reportingTo: number | string;
  mobileNumber: number | string;
  phoneNumber: number | string;
  designation: string;
  birthDate: string;
  updatedBy: number | string;
  status: number | string;
}
export interface IEstimation {
  dbName: string;
  dbPassword: string;
  userId: number | string;
}
export interface IEstimationListParam {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  departmentId: number | string;
  licenceId: number | string;
  year: number | string;
}
export interface IEstimationSaveParam {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  departmentId: number | string;
  licenceServerId: number | string;
  year: number | string;
  estimationId: number | string;
  projectId: number | string;
  shiftId: number | string;
  january: number | string;
  february: number | string;
  march: number | string;
  april: number | string;
  may: number | string;
  june: number | string;
  july: number | string;
  august: number | string;
  september: number | string;
  october: number | string;
  november: number | string;
  december: number | string;
  updatedBy: number | string;
}
export interface IActualUsageListing {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  licenceId: number | string;
  month: number | string;
  year: number | string;
}
export interface IDeptActualUsageParam {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  updatedBy: number | string;
  licenceServerId: number;
  month: number;
  year: number | string;

  licenceUsedCout: number;
  totalCost: number;
  averageCost: number;

  departmentId: number | string;
  usageHours: number | string;

  moduleName: string;
  entityId: number | string;
}
export interface IreportListParam {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  licenceId: number | string;
  month: number | string;
  year: number | string;
}
export interface ISummaryListParam {
  dbName: string;
  dbPassword: string;
  userId: number | string;
  licenceId: number | string;
  year: number | string;
}
